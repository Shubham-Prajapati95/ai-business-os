def insert_tempdata(conn, data):
    cursor = conn.cursor()
    try:
        query = """
        INSERT INTO tempdata(
            order_id,
            customer_name,
            country,
            city,
            product_name,
            category_name,
            product_price,
            quantity,
            order_date
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.executemany(query, data)
    finally:
        cursor.close()