import os
import pandas as pd
import requests
from typing import Optional

from app.config import NODE_GRAPH_URL

class DataClient:
    def __init__(self, graphql_url: str = None):
        self.graphql_url = graphql_url or NODE_GRAPH_URL


    # ----------------
    # GraphQL Methods
    # ----------------
    def run_graphql_query(self, query: str, variables: dict = None, headers: dict = None):
        """Generic methos to run any GraphQL query"""
        payload = {"query": query, "variables":variables or {}}

        default_headers = {"Content-Type": "application/json"}
        if headers:
            default_headers.update(headers)
        headers = default_headers

        response = requests.post(self.graphql_url, json=payload, headers=headers)
        response.raise_for_status() # raise exception if HTTP error
        result = response.json()

        if "errors" in result:
            raise Exception(f"GraphQL errors: {result['errors']}")
        return result["data"]
    
    def get_bank_transactions(self, user_token: str) -> pd.DataFrame:
        from app.services.queries.analysis_queries import ME_TRANSACTION_QUERY

        headers = {"Authorization": f"Bearer {user_token}"}
        data = self.run_graphql_query(ME_TRANSACTION_QUERY, headers=headers)

        transactions = data["me"]["bankTransactions"]
        
        return pd.DataFrame(transactions)

        

    # ----------------
    # CSV Methods
    # ----------------
    @staticmethod
    def read_csv_file(file_path: str) -> pd.DataFrame:
        """Load CSV into a DataFrame for analysis."""
        df = pd.read_csv(file_path)
        return df
    

    


