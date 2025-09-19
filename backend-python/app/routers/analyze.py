from fastapi import Header, HTTPException, APIRouter, UploadFile, File, Depends
from app.services.data_client import DataClient
from fastapi.responses import JSONResponse

from app.services.analysis.transaction_analysis import TransactionAnalysis
from app.services.analysis.spending_analysis import SpendingAnalysis
from app.services.node_client import tx_year_month_category
# from app.services.helpers.normalize import convert_to_python

router = APIRouter()
data_client = DataClient()

@router.post("/transactions")
async def analyze_transactions(
    authorization: str = Header(..., convert_underscores=False)
):
    # Extract the token from the header (remove "Bearer " prefix)
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    user_token = authorization[len("Bearer "):]

    df = data_client.get_bank_transactions(user_token)

    # Run analysis on dataframe
    summary = TransactionAnalysis(df).summary_by_category()
    print(summary)

    # Recursively convert NumPy types in summary if needed
    # summary = {k: convert_to_python(v) for k, v in summary.items()}
    return { "summary": summary }


@router.post("/spendings")
async def analyze_spendings(file: UploadFile):
    df = data_client.read_csv_file(file.file)

    summary = SpendingAnalysis(df).summary_by_category()

    return summary
