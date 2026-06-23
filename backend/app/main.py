from fastapi import FastAPI

from backend.app.api.upload import router as upload_router
from backend.app.api.total_revenue import router as revenue_router
from backend.app.api.revenue_by_products import router as products_router
from backend.app.api.revenue_by_categories import router as categories_router
from backend.app.api.customers_analysis import router as customers_router
app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(revenue_router)
app.include_router(products_router)
app.include_router(categories_router)
app.include_router(customers_router)