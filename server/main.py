from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import services

app=FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(services.router)


@app.get("/")
def read_root():
    return {"root": "/"}

