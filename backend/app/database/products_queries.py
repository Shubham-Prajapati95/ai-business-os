def insert_products(conn):
    cursor = conn.cursor()
    try:
        query="""
           INSERT IGNORE INTO products
           (product_name,
            category_id,
            price
           )
           SELECT DISTINCT
           tempdata.product_name,
           categories.category_id,
           tempdata.product_price
           FROM tempdata
           JOIN categories
            ON 
           tempdata.category_name=categories.category_name
"""
        cursor.execute(query)
    finally:
        cursor.close()
     
        

