def insert_customers(conn):
    cursor = conn.cursor()
    try:
        query = """
        INSERT IGNORE INTO customers
        (   customer_name,
            country,
            city)
        SELECT DISTINCT
            customer_name,
            country,
            city 
        FROM tempdata
        """
        cursor.execute(query)
    finally:
        cursor.close()
