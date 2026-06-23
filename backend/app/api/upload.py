from fastapi import APIRouter, UploadFile, File, HTTPException

from backend.app.database.connection import get_connection
from backend.app.services.excel_service import read_csv
from backend.app.database.tempdata_queries import insert_tempdata
from backend.app.database.customers_queries import insert_customers
from backend.app.database.catrgories_queries import insert_categories
from backend.app.database.products_queries import insert_products
from backend.app.database.orders_queries import insert_orders
from backend.app.database.order_items_queries import insert_order_items
router = APIRouter()

@router.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="only csv files allowed")
    conn = get_connection()
    try:
        df = read_csv(file.file)

        if df.empty:
            raise HTTPException(status_code=400, detail="file is empty")
        data = df.values.tolist()
        insert_tempdata(conn,data)
        insert_customers(conn)
        insert_categories(conn)
        insert_products(conn)
        insert_orders(conn)
        insert_order_items(conn)
        conn.commit()
        return{
            "status":"success",
            "rows_inserted":len(data)
        }
    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"error processing file:{str(e)}")
    finally:
        conn.close()
    
    