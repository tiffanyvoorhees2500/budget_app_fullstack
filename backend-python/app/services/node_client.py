import requests
import pandas as pd

from app.config import NODE_GRAPH_URL

def tx_year_month_category(user_token: str):
    query = """
        query GetAllBankTransactions {
            me {
                id
                name
                email
                bankTransactions {
                    id
                    date
                    amount
                    default_category
                }
            }
        }
    """

    headers = {
        "Authorization": f"Bearer {user_token}",
        "Content-Type": "application/json"
    }

    response = requests.post(
        NODE_GRAPH_URL,
        json={"query": query},
        headers=headers
    )

    if response.status_code != 200:
        raise Exception(f"GraphQL query failed with status code {response.status_code}: {response.text}")
    
    data = response.json()
    transactions = data["data"]["me"]["bankTransactions"]

    # Convert to dataframe
    df = pd.DataFrame(transactions)

    #Ensure proper types
    df['amount'] = pd.to_numeric(df['amount'], errors='coerce').fillna(0)
    df['date'] = pd.to_datetime(df['date'], errors='coerce')

    # Extract year and month for grouping
    df['year'] = df['date'].dt.year
    df['month'] = df['date'].dt.month

    #Group by year, month, and category and sum amounts
    grouped = df.groupby(['year', 'month', 'default_category']).agg(
        total_amount=pd.NamedAgg(column='amount', aggfunc='sum'),
        transaction_count=pd.NamedAgg(column='id', aggfunc='count')
    ).reset_index()

    return grouped