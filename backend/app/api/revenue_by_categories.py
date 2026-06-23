from fastapi import APIRouter, Query
from backend.app.database.dashboard_queries import (
    get_top_categories_query,
    get_all_categories_query,
    get_revenue_trend_query_by_category
)
from backend.app.database.connection import get_connection

router = APIRouter()

@router.get("/top-categories")
def top_categories(limit: int = 5):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        query = get_top_categories_query()
        cursor.execute(query, (limit,))
        return {"data": cursor.fetchall()}

    finally:
        cursor.close()
        conn.close()

@router.get("/all-categories")
def all_categories():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        query = get_all_categories_query()
        cursor.execute(query)
        return {"data": cursor.fetchall()}

    finally:
        cursor.close()
        conn.close()


@router.get("/category-revenue-trend")
def category_revenue_trend(
    categories: list[str] = Query(...),
    period: str = "monthly"
):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        query = get_revenue_trend_query_by_category(categories, period)
        cursor.execute(query,categories)

        return {"data": cursor.fetchall()}

    finally:
        cursor.close()
        conn.close()