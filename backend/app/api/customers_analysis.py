from fastapi import APIRouter, Query
from backend.app.database.dashboard_queries import (
    get_top_customers_query,
    get_all_customers_query,
    get_new_customers_trend_query,
    get_top_countries_by_customers_query,
    get_top_cities_by_customers_query
)
from backend.app.database.connection import get_connection

router = APIRouter()

@router.get("/top-customers")
def top_customers(limit: int = 5):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        query = get_top_customers_query()
        cursor.execute(query, (limit,))
        return {"data": cursor.fetchall()}

    finally:
        cursor.close()
        conn.close()

@router.get("/all-customers")
def all_customers():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        query = get_all_customers_query()
        cursor.execute(query)
        return {"data": cursor.fetchall()}

    finally:
        cursor.close()
        conn.close()


@router.get("/new-customers-trend")
def customers_trend(interval: str = Query("monthly", enum=["monthly", "weekly", "yearly", "quarterly"])
):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        query = get_new_customers_trend_query(interval)
        cursor.execute(query)
        result = cursor.fetchall()

        return {
            "data": result
        }

    finally:
        cursor.close()
        conn.close()

@router.get("/top-contries")
def top_contries(limit: int = 5):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        query = get_top_countries_by_customers_query()
        cursor.execute(query, (limit,))
        return {"data": cursor.fetchall()}

    finally:
        cursor.close()
        conn.close()

@router.get("/top-cities")
def top_cities(limit: int = 5):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        query = get_top_cities_by_customers_query()
        cursor.execute(query, (limit,))
        return {"data": cursor.fetchall()}

    finally:
        cursor.close()
        conn.close()