from fastapi import APIRouter, Query
from backend.app.database.dashboard_queries import (
    get_total_revenue_query,
    get_revenue_over_time_query,
    get_top_periods_query
)
from backend.app.database.connection import get_connection 

router = APIRouter()


@router.get("/total-revenue")
def total_revenue():
    conn = get_connection()
    cursor = conn.cursor()

    try:
        query = get_total_revenue_query()
        cursor.execute(query)

        result = cursor.fetchone()[0] or 0

        return {"total_revenue": int(result)}

    finally:
        cursor.close()
        conn.close()

@router.get("/revenue-over-time")
def revenue_over_time(
    interval: str = Query("monthly", enum=["monthly", "weekly", "yearly", "quarterly"])
):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        query = get_revenue_over_time_query(interval)
        cursor.execute(query)

        rows = cursor.fetchall()

        return {
            "data": [
                {"period": r[0], "revenue": float(r[1])}
                for r in rows
            ]
        }

    finally:
        cursor.close()
        conn.close()

@router.get("/top-periods")
def top_periods(
    interval: str = Query("monthly", enum=["monthly", "weekly", "yearly", "quarterly"]),
    type: str = Query("best", enum=["best", "worst"])
):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        query = get_top_periods_query(interval, type)
        cursor.execute(query)

        rows = cursor.fetchall()

        return {
            "data": [
                {"period": r[0], "revenue": float(r[1])}
                for r in rows
            ]
        }

    finally:
        cursor.close()
        conn.close()