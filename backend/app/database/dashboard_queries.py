def get_total_revenue_query():
    return """
    SELECT SUM(price*quantity) AS total_revenue
    FROM order_items
    """


def get_revenue_over_time_query(interval):

    if interval == "monthly":
        return """
      SELECT DATE_FORMAT(orders.order_date, '%Y-%m') AS period,
               SUM(order_items.price*order_items.quantity) AS revenue
        FROM orders
        join order_items
        ON orders.orderindex_id=order_items.orderindex_id 
        GROUP BY period
        ORDER BY period
        """

    elif interval == "weekly":
        return """
        SELECT CONCAT(YEAR(orders.order_date), '-W', WEEK(orders.order_date, 1)) AS period,
               SUM(order_items.price*order_items.quantity) AS revenue
        FROM orders 
        JOIN order_items
        ON orders.orderindex_id = order_items.orderindex_id
        GROUP BY period
        ORDER BY MIN(orders.order_date)
        """

    elif interval == "yearly":
        return """
        SELECT YEAR(orders.order_date) AS period,
        SUM(order_items.price*order_items.quantity) AS revenue
        FROM orders
        JOIN order_items
        ON orders.orderindex_id = order_items.orderindex_id
        GROUP BY period
        ORDER BY period
        """

    elif interval == "quarterly":
        return """
        SELECT CONCAT(YEAR(orders.order_date),'-Q',QUARTER(orders.order_date)) AS period,
        SUM(order_items.price*order_items.quantity) AS revenue
        FROM orders
        JOIN order_items
        ON orders.orderindex_id = order_items.orderindex_id
        GROUP BY period
        ORDER BY MIN(orders.order_date)

        """

    else:
        raise ValueError("Invalid interval")


def get_top_periods_query(interval, type="best"):

    base_query = get_revenue_over_time_query(interval)

    order = "DESC" if type == "best" else "ASC"

    return f"""
    SELECT *
    FROM (
        {base_query}
    ) AS t
    ORDER BY revenue {order}
    LIMIT 5;
    """

def get_top_products_query():
    return """
    SELECT
        p.product_name,
        SUM(oi.quantity * oi.price) AS revenue
    FROM order_items oi
    JOIN products p
        ON oi.product_id = p.product_id
    GROUP BY p.product_name
    ORDER BY revenue DESC
    LIMIT %s
    """


def get_all_products_query():
    return """
    SELECT
        p.product_name,
        c.category_name
    FROM products p
    JOIN categories c
        ON c.category_id = p.category_id
    ORDER BY product_name
    """


def get_revenue_trend_query(products, period):

    if period == "monthly":
        period_sql = "DATE_FORMAT(o.order_date, '%Y-%m')"

    elif period == "weekly":
        period_sql = "YEARWEEK(o.order_date, 1)"

    elif period == "quarterly":
        period_sql = """
        CONCAT(
            YEAR(o.order_date),
            '-Q',
            QUARTER(o.order_date)
        )
        """

    elif period == "yearly":
        period_sql = "YEAR(o.order_date)"

    else:
        raise ValueError("Invalid period")

    placeholders = ",".join(["%s"] * len(products))

    return f"""
    SELECT
        p.product_name,
        {period_sql} AS period,
        SUM(oi.quantity * oi.price) AS revenue

    FROM order_items oi

    JOIN orders o
        ON oi.orderindex_id = o.orderindex_id

    JOIN products p
        ON oi.product_id = p.product_id

    WHERE p.product_name IN ({placeholders})

    GROUP BY
        p.product_name,
        period

    ORDER BY
        MIN(o.order_date)
    """

def get_top_categories_query():
    return """
    SELECT
        c.category_name,
        SUM(oi.quantity * oi.price) AS revenue
    FROM order_items oi
    JOIN products p
        ON oi.product_id = p.product_id
    JOIN categories c
        ON c.category_id = p.category_id
    GROUP BY c.category_name
    ORDER BY revenue DESC
    LIMIT %s
    """


def get_all_categories_query():
    return """
    SELECT category_name
    FROM categories
    ORDER BY category_name
    """


def get_revenue_trend_query_by_category(categories, period):

    if period == "monthly":
        period_sql = "DATE_FORMAT(o.order_date, '%Y-%m')"

    elif period == "weekly":
        period_sql = "YEARWEEK(o.order_date, 1)"

    elif period == "quarterly":
        period_sql = """
        CONCAT(
            YEAR(o.order_date),
            '-Q',
            QUARTER(o.order_date)
        )
        """

    elif period == "yearly":
        period_sql = "YEAR(o.order_date)"

    else:
        raise ValueError("Invalid period")

    placeholders = ",".join(["%s"] * len(categories))

    return f"""
    SELECT
        c.category_name,
        {period_sql} AS period,
        SUM(oi.quantity * oi.price) AS revenue

    FROM order_items oi

    JOIN orders o
        ON oi.orderindex_id = o.orderindex_id

    JOIN products p
        ON oi.product_id = p.product_id

    JOIN categories c
        ON c.category_id = p.category_id

    WHERE c.category_name IN ({placeholders})

    GROUP BY
        c.category_name,
        period

    ORDER BY
        MIN(o.order_date)
    """

def get_top_customers_query():
    return """
    SELECT
        cu.customer_name,
        SUM(oi.quantity * oi.price) AS revenue
    FROM order_items oi
    JOIN orders o
        ON o.orderindex_id = oi.orderindex_id
    JOIN customers cu
        ON cu.customer_id = o.customer_id
    GROUP BY cu.customer_name
    ORDER BY revenue DESC
    LIMIT %s
    """


def get_all_customers_query():
    return """
    SELECT customer_name
    FROM customers
    ORDER BY customer_name
    """

def get_new_customers_trend_query(interval):

    if interval == "monthly":
        period_sql = "DATE_FORMAT(first_order_date, '%Y-%m')"

    elif interval == "weekly":
        period_sql = "YEARWEEK(first_order_date, 1)"

    elif interval == "quarterly":
        period_sql = """
        CONCAT(
            YEAR(first_order_date),
            '-Q',
            QUARTER(first_order_date)
        )
        """

    elif interval == "yearly":
        period_sql = "YEAR(first_order_date)"

    else:
        raise ValueError("Invalid interval")

    return f"""
    SELECT
        {period_sql} AS period,
        COUNT(*) AS new_customers

    FROM (
        SELECT
            customer_id,
            MIN(order_date) AS first_order_date
        FROM orders
        GROUP BY customer_id
    ) AS first_orders

    GROUP BY period
    ORDER BY period
    """
def get_top_countries_by_customers_query():
    return """
    SELECT
        country,
        COUNT(DISTINCT customer_id) AS total_customers

    FROM customers

    GROUP BY country

    ORDER BY total_customers DESC

    LIMIT %s
    """
def get_top_cities_by_customers_query():
    return """
    SELECT
        city,
        COUNT(DISTINCT customer_id) AS total_customers

    FROM customers

    GROUP BY city

    ORDER BY total_customers DESC

    LIMIT %s;
    """
