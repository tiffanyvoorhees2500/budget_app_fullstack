from .cleaning import clean_amount
import pandas as pd

def guess_columns(df: pd.DataFrame):
    candidates = {
        "id": [],
        "account": [],
        "date": [],
        "amount": [],
        "credit-debit": [],
        "category": [],
        "descriptions": []
    }

    for col in df.columns:
        lower = col.lower()
        # Add columns with name matches
        if any(k in lower for k in ["transaction id", "id"]):
            candidates["id"].append(col)
            
        elif any(k in lower for k in ["account"]):
            candidates["account"].append(col)
            
        elif any(k in lower for k in ["date", "effective date", "posting date"]):
            candidates["date"].append(col)
            
        elif any(k in lower for k in ["amount", "amt"]):
            candidates["amount"].append(col)
            # Clean up the amount column
            df[col] = df[col].apply(clean_amount)
            
        elif any(k in lower for k in ["transaction type", "credit", "debit"]):
            candidates["credit-debit"].append(col)
            
        elif any(k in lower for k in ["category", "transaction category"]):
            candidates["category"].append(col)
            
        elif any(k in lower for k in ["description", "desc", "memo", "transaction", "details"]):
            candidates["descriptions"].append(col)
            
    # Fallback using data inspection
    for col in df.columns:
        if col not in candidates["date"]:
            if pd.api.types.is_datetime64_any_dtype(df[col]) or \
               df[col].astype(str).str.match(r"\d{4}-\d{2}-\d{2}|\d{2}/\d{2}/\d{4}").any():
                candidates["date"].append(col)

        if col not in candidates["amount"]:
            if pd.api.types.is_numeric_dtype(df[col]):
                candidates["amount"].append(col)

    return candidates, df
