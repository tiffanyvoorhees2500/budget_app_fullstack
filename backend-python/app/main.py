from fastapi import FastAPI
from app.routers import upload, analyze


app = FastAPI()

app.include_router(upload.router, prefix="/upload", tags=["upload"])
app.include_router(analyze.router, prefix="/analyze", tags=["analyze"])
