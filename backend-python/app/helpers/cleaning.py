import numpy as np

def clean_amount(val):
    if val is None:
        return 0.0

    # Handle empty dash or empty strings
    if val in ("", "-", "--"):
        return 0.0

    # Remove dollar signs and commas
    val = val.replace("$", "").replace(",", "")

    # Handle parentheses for negatives
    if val.startswith("(") and val.endswith(")"):
        val = "-" + val[1:-1]

    # Handle weird cases like "-(300.00)"
    val = val.replace("(", "").replace(")", "")

    try:
        return float(val)
    except ValueError:
        return 0.0
