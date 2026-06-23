from fastapi import APIRouter, Query
from backend.app.database.dashboard_queries import (
    get_top_products_query,
    get_all_products_query,
    get_revenue_trend_query
)
from backend.app.database.connection import get_connection

router = APIRouter()

@router.get("/top-products")
def top_products(limit: int = 5):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        query = get_top_products_query()
        cursor.execute(query, (limit,))
        return {"data": cursor.fetchall()}

    finally:
        cursor.close()
        conn.close()

@router.get("/all-products")
def all_products():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        query = get_all_products_query()
        cursor.execute(query)
        return {"data": cursor.fetchall()}

    finally:
        cursor.close()
        conn.close()


@router.get("/product-revenue-trend")
def revenue_trend(
    products: list[str] = Query(...),
    period: str = "monthly"
):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        query = get_revenue_trend_query(products, period)
        cursor.execute(query, products)

        return {"data": cursor.fetchall()}

    finally:
        cursor.close()
        conn.close()