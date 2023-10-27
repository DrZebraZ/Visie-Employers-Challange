from .employeeRouter import employeeRoutes
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
#uvicorn run:app --reload

app.include_router(employeeRoutes, prefix='/employee')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)