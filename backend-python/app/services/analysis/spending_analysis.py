import pandas as pd

from app.helpers.normalize import normalize_transaction_df
from app.helpers.cleaning import clean_amount

""" Currently the column names here match a CSV file because spending models are not in DB"""
class SpendingAnalysis:
    def __init__(self, df: pd.DataFrame):
        self.df = df.copy()

        #Normalize columns if needed
        self.df = normalize_transaction_df(df)

    def summary_by_category(self):
        """Return spending summary grouped by year/month/category"""
        # if "date" not in self.df.columns or "default_category" not in self.df.columns:
        #     raise ValueError("DataFrame must have 'date' and 'default_category' columns")
        
        #Ensure proper types
        self.df['Quantity'] = pd.to_numeric(self.df['Quantity'], errors='coerce').fillna(0)
        self.df['Price'] = self.df['Price'].apply(clean_amount)
        self.df['Discount/Fees'] = self.df.get('Discount/Fees', 0).apply(clean_amount)

        # Remove % sign, convert to float, divide by 100
        self.df['Tax Rate'] = (
            self.df['Tax']
            .fillna('0%')                # Replace missing/NaN with '0%'
            .str.rstrip('%')              # Remove trailing %
            .replace('', '0')             # Handle empty strings
            .astype(float) / 100          # Convert to decimal
        )

        # Calculate subtotal and total
        self.df['Subtotal'] = (self.df['Quantity'] * self.df['Price']) + self.df['Discount/Fees']
        self.df['Total'] = self.df['Subtotal'] * (1 + self.df['Tax Rate'])

        # Extract year and month for grouping
        self.df['Date'] = pd.to_datetime(self.df['Date'], errors='coerce')
        self.df['Year'] = self.df['Date'].dt.year
        # self.df['month'] = self.df['Date'].dt.month

        # Strip Category whitespace
        self.df['Category'] = self.df['Category'].str.strip()

        #Group by year, month, and category and sum amounts
        grouped = self.df.groupby(['Category', 'Year']).agg(
            subtotal_amount=('Subtotal', 'sum'),
            total_amount=('Total', 'sum'),
        ).reset_index()

        print(grouped)

        summary = {
            'grand_subtotal': self.df['Subtotal'].sum(),
            'grand_total': self.df['Total'].sum()
        }

        return {
            "line_items": grouped.to_dict(orient="records"),
            "summary": summary
        }