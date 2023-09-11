from fastapi import APIRouter, File, UploadFile

router = APIRouter()

@router.post("/services/processpages", tags=["services"])
def process_pages(file: UploadFile):
    pass

@router.post("/services/pdf2excel", tags=["services"])
def pdf_to_excel(file: UploadFile):
    pass

