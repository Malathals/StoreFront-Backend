API Endpoints Overview

    Product Endpoints:
        A GET request to /products will return a list of all products.
        A GET request to /products/:id will return the details of a specific product using its ID.
        A POST request to /createProduct allows the creation of a new product. This route requires a valid token for authentication.

    User Endpoints:
        A GET request to /users returns a list of all users. This route requires a valid token.
        A GET request to /users/:id returns the details of a specific user by their ID. This also requires authentication via a token.
        A POST request to /createUser allows the creation of a new user, also requiring a token for authentication.

    Order Endpoints:
        A GET request to /orders/:user_id retrieves the current orders for a specific user by their user ID. This route requires a valid token for access.

Database Schema

    PRODUCT Table:
        The id column is of type SERIAL and serves as the primary key.
        The name column is of type VARCHAR(150) and stores the name of the product.
        The price column is of type INTEGER and stores the product's price.
        The category column is of type VARCHAR(100) and stores the product's category.

    USERS Table:
        The id column is of type SERIAL and serves as the primary key.
        The first_name column is of type VARCHAR(150) and stores the user's first name.
        The last_name column is of type VARCHAR(150) and stores the user's last name.
        The password column is of type VARCHAR(100) and stores the hashed password of the user.

    ORDERS Table:
        The id column is of type SERIAL and serves as the primary key.
        The status column is of type VARCHAR(100) and stores the current status of the order (such as active or complete).
        The user_id column is of type INTEGER and references the id column in the USERS table to associate an order with a user.

    ORDER_PRODUCT Table:
        The id column is of type SERIAL and serves as the primary key.
        The order_id column is of type INTEGER and references the id column in the ORDERS table.
        The product_id column is of type INTEGER and references the id column in the PRODUCT table.
        The quantity column is of type INTEGER and stores the quantity of the product in the order.

Relationships:

    Each user can have multiple orders. The user_id column in the ORDERS table establishes this relationship by referencing the id of a user.
    Each order can have multiple products. The ORDER_PRODUCT table is used to link orders to products, with the order_id and product_id columns serving as foreign keys.