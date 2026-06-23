def insert_categories(conn):
    cursor = conn.cursor()
    try:
        query = """
          INSERT IGNORE INTO 
          categories(category_name) 
          SELECT DISTINCT category_name 
          FROM tempdata
"""
        cursor.execute(query)
    finally:
        cursor.close()