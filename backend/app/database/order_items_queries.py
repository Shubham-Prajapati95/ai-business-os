def insert_order_items(conn):
    cursor=conn.cursor()
    try:
        query="""
        INSERT INTO order_items(
        orderindex_id,
        product_id,
        price,
        quantity
        )
        SELECT 
        orders.orderindex_id,
        products.product_id,
        tempdata.product_price,
        tempdata.quantity
        FROM
        tempdata
        JOIN 
        orders
        ON 
        tempdata.order_id = orders.order_id
        JOIN 
        products 
        ON
        tempdata.product_name = products.product_name;
"""
        cursor.execute(query)
    finally:
        cursor.close()
        