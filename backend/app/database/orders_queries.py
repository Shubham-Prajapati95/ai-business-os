def insert_orders(conn):
    cursor=conn.cursor()
    try:
       
        query="""
         INSERT IGNORE INTO orders
         (order_id,
          customer_id,
          order_date
         )
         SELECT DISTINCT 
         tempdata.order_id,
         customers.customer_id,
         tempdata.order_date
         FROM tempdata
         JOIN customers
         ON 
         tempdata.customer_name=customers.customer_name
"""
        cursor.execute(query)
    finally:
        cursor.close()
