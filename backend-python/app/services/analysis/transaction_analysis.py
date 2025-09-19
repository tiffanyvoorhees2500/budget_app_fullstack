import pandas as pd

from app.helpers.normalize import normalize_transaction_df

class TransactionAnalysis:
    def __init__(self, df: pd.DataFrame):
        self.df = df.copy

        #Normalize columns if needed
        self.df = normalize_transaction_df(df)

    def summary_by_category(self):
        """Return spending summary grouped by year/month/category"""
        # if "date" not in self.df.columns or "default_category" not in self.df.columns:
        #     raise ValueError("DataFrame must have 'date' and 'default_category' columns")
        
        #Ensure proper types
        self.df['amount'] = pd.to_numeric(self.df['amount'], errors='coerce').fillna(0)
        self.df['date'] = pd.to_datetime(self.df['date'], errors='coerce')

        # Extract year and month for grouping
        self.df['year'] = self.df['date'].dt.year
        self.df['month'] = self.df['date'].dt.month

        #Group by year, month, and category and sum amounts
        grouped = self.df.groupby(['year', 'month', 'default_category']).agg(
            total_amount=pd.NamedAgg(column='amount', aggfunc='sum'),
            transaction_count=pd.NamedAgg(column='id', aggfunc='count')
        ).reset_index()

        return grouped.to_dict(orient="records")