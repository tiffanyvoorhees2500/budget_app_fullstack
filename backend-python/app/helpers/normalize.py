import pandas as pd
import numpy as np

def normalize_transaction_df(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    
    # Normalize amounts
    if "amount" in df.columns:
        df["amount"] = pd.to_numeric(df["amount"], errors="coerce")
    
    # Normalize dates
    if "date" in df.columns:
        df["date"] = pd.to_datetime(df["date"], errors="coerce")
    
    # Optionally, fill missing categories or standardize text
    if "category" in df.columns:
        df["category"] = df["category"].str.strip().str.title()
    
    return df

def convert_to_python(obj):
    if isinstance(obj, np.integer):
        return int(obj)
    if isinstance(obj, np.floating):
        return float(obj)
    if isinstance(obj, np.ndarray):
        return obj.tolist()
    return obj