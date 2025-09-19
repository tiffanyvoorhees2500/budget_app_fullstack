from fastapi import APIRouter, UploadFile, File
from fastapi.concurrency import run_in_threadpool
import pandas as pd
from typing import Any, Dict
from app.helpers.matching import guess_columns

router = APIRouter()


@router.post("/csv/transactions")
async def csv_transactions(file: UploadFile = File(...)) -> Dict[str, Any]:
    # Read the incoming file into a DataFrame
    df = await run_in_threadpool(pd.read_csv, file.file)

    # guess_columns returns (candidates, df) — unpack it so we get the cleaned df back
    candidates, df = guess_columns(df)

    # Build a preview: list of rows (as dicts) with native Python types (None for NaN)
    preview_rows = (
        df.head(30)
        .astype(object)
        .where(pd.notnull(df), None)
        .to_dict(orient="records")
    )

    return {
        "candidates": candidates,
        "preview": preview_rows,
    }

@router.post("/csv/spendings")
async def csv_spendings(file: UploadFile = File(...)) -> Dict[str, Any]:
    # Read the incoming file into a DataFram
    df = await run_in_threadpool(pd.read_csv, file.file)

    preview_rows = (
        df.head(30)
        .astype(object)
        .where(pd.notnull(df), None)
        .to_dict(orient="records")
    )

    return {
        "preview": preview_rows
    }
