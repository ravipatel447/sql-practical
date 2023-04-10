-- Active: 1680862761146@@127.0.0.1@3306@SQL PRACTICAL

CREATE Table
    permissions (
        permission_id INT PRIMARY KEY AUTO_INCREMENT,
        TableName TEXT
    );

create table
    `role`(
        role_id int PRIMARY KEY AUTO_INCREMENT,
        role_name VARCHAR(10)
    );

CREATE Table
    role_permissions(
        permission_id INT,
        role_id INT,
        `create` BOOLEAN,
        `read` BOOLEAN,
        `update` BOOLEAN,
        `delete` BOOLEAN,
        PRIMARY KEY(permission_id, role_id),
        FOREIGN KEY (permission_id) REFERENCES permissions(permission_id) on delete CASCADE,
        FOREIGN KEY (role_id) REFERENCES `role`(role_id) on delete CASCADE
    );

CREATE Table
    `user`(
        user_id int PRIMARY KEY AUTO_INCREMENT,
        `name` VARCHAR(30),
        `email` VARCHAR(50),
        `address` TEXT,
        `password` TEXT,
        role_id INT DEFAULT 2,
        FOREIGN KEY(role_id) REFERENCES `role`(role_id) on delete
        SET NULL
    );

CREATE Table
    product(
        product_id int PRIMARY KEY AUTO_INCREMENT,
        `product_name` VARCHAR(50),
        `product_price` INT(10),
        `seller_id` INT,
        Foreign Key (`seller_id`) REFERENCES `user`(user_id) on delete CASCADE
    );

create table
    `order`(
        order_id int PRIMARY KEY AUTO_INCREMENT,
        order_date DATETIME,
        `customer_id` int NOT NULL,
        `status` ENUM(
            'pending',
            'processing',
            'shipped',
            'delivered'
        ),
        expected_delivery_date DATE,
        Foreign Key (`customer_id`) REFERENCES `user`(user_id) on delete CASCADE
    );

CREATE Table
    `order_detail`(
        order_id INT,
        product_id INT,
        product_Quentity INT,
        PRIMARY KEY(order_id, product_id),
        FOREIGN KEY (order_id) REFERENCES `order`(order_id) on delete CASCADE,
        FOREIGN KEY (product_id) REFERENCES `product`(product_id) on delete CASCADE
    );

/* ------------------------------------------------------------------------------------------------------------------ */

INSERT INTO `role`(role_name)
VALUES ('admin'), ('customer'), ('seller');

INSERT INTO
    `permissions`(TableName)
VALUES ('user'), ('order'), ('product'), ('order_detail'), ('role');

INSERT INTO
    role_permissions(
        role_id,
        permission_id,
        `create`,
        `read`,
        `update`,
        `delete`
    )
VALUES (1, 1, true, true, true, true), (1, 2, true, true, true, true), (1, 3, true, true, true, true), (1, 4, true, true, true, true), (1, 5, true, true, true, true), (2, 1, true, true, true, true), (2, 2, true, true, false, true), (2, 3, false, true, false, false), (2, 4, true, true, false, false), (2, 5, false, false, false, false), (3, 1, false, true, false, true), (3, 2, true, true, false, true), (3, 3, true, true, true, true), (3, 4, false, true, false, false), (3, 5, false, false, false, false);

INSERT into
    `user`(
        `name`,
        `email`,
        `address`,
        `password`
    )
VALUES (
        'jenil',
        'jenil@test.com',
        'little wing bopal',
        'password'
    ), (
        'chirag',
        'chirag@test.com',
        'pg gota',
        'password'
    ), (
        'ravi',
        'ravi@test.com',
        'applewood shella',
        'password'
    );

INSERT into
    `user`(
        `name`,
        `email`,
        `address`,
        `password`,
        `role_id`
    )
VALUES (
        'jay Bhavani',
        'bhavani@test.com',
        'shela jay bhavani',
        'password',
        3
    ), (
        'McDonalds',
        'mcdonalds@test.com',
        'iskon',
        'password',
        3
    );

INSERT into
    `user`(
        `name`,
        `email`,
        `address`,
        `password`,
        `role_id`
    )
VALUES (
        'admin',
        'admin@admin.com',
        'simform',
        'admin@admin.com',
        1
    );

INSERT into
    `user`(
        `name`,
        `email`,
        `address`,
        `password`
    )
VALUES (
        'divy',
        'divy@test.com',
        'karnavati club',
        'password'
    );

INSERT into
    `product`(
        product_name,
        product_price,
        seller_id
    )
VALUES ('vadapau', 30, 4), ('pau bhaji', 120, 4), ('pani puri', 20, 4), ('sandwich', 60, 4), ('manchurian', 140, 4);

INSERT into
    `product`(
        product_name,
        product_price,
        seller_id
    )
VALUES ('allo ticki burger', 60, 5), ('mac puff', 59, 5), ('cock', 40, 5), ('french fries R', 80, 5), ('french fries M', 100, 5), ('french fries L', 120, 5);

INSERT into
    `order`(
        order_date,
        customer_id,
        expected_delivery_date,
        `status`
    )
VALUES (
        '2023-02-14 12:34:12',
        1,
        '2023-02-18',
        'processing'
    ), (
        '2023-02-16 01:12:34',
        2,
        '2023-02-17',
        'shipped'
    ), (
        '2023-02-15 11:11:11',
        3,
        '2023-02-17',
        'pending'
    ), (
        '2023-02-12 09:16:25',
        1,
        '2023-02-14',
        'delivered'
    ), (
        '2023-02-11 10:01:56',
        2,
        '2023-02-13',
        'delivered'
    );

INSERT INTO
    order_detail(
        `order_id`,
        `product_id`,
        product_Quentity
    )
VALUES (1, 1, 2), (1, 2, 1), (1, 3, 1), (2, 5, 1), (2, 6, 3), (2, 1, 4), (2, 2, 1), (3, 4, 1), (4, 6, 2), (4, 7, 1), (4, 8, 3), (4, 11, 1), (5, 1, 5), (5, 2, 2), (5, 4, 1), (5, 3, 2);

/*----------------------------------practical start----------------------------------*/

/*
 * 1st practical
 * 1. Fetch all the User order list and include atleast following details in that.
 *	- Customer name
 *	- Product names
 *	- Order Date
 *	- Expected delivery date (in days, i.e. within X days)
 */

SELECT
    u.name as `Customer Name`,
    o.order_id,
    p.product_name as `product name`,
    s.name as `seller name`,
    o.order_date as `order date`,
    o.status as `status`,
    DATEDIFF(
        o.expected_delivery_date,
        o.order_date -- CURDATE() or we can use this also
    ) as `expected delivery date`,
    od.`product_Quentity` as `Quantity`
from `order` o
    JOIN order_detail od on od.order_id = o.order_id
    JOIN product p on p.product_id = od.product_id
    JOIN `user` u on u.`user_id` = o.customer_id
    JOIN `user` s on s.user_id = p.seller_id;

/*    
 * 2nd practical
 * 2. Create summary report which provide information about
 *	- All undelivered Orders
 *	- 5 Most recent orders
 *	- Top 5 active users (Users having most number of orders)
 *	- Inactive users (Users who hasn’t done any order)
 *	- Top 5 Most purchased products
 *	- Most expensive and most cheapest orders.
 */

-- all undelivered orders

SELECT * from `order` WHERE status != 'delivered';

-- 5 Most recent orders

SELECT * from `order` ORDER BY order_date desc LIMIT 5;

-- top 5 active users

SELECT
    u.name as `Customer Name`,
    COUNT(order_id) as `Number of Orders`
from `order` o
    JOIN `user` u on o.customer_id = u.user_id
GROUP BY o.customer_id
ORDER BY
    `Number of Orders` DESC
limit 5;

-- Inactive users (Users who hasn’t done any order)

SELECT name as `customer name`
from `user` u
    LEFT JOIN `order` o ON o.customer_id = u.user_id
WHERE o.order_id is NULL;

-- Top 5 Most purchased products

select
    p.product_name,
    SUM(od.`product_Quentity`) as `count of purchase`
from order_detail od
    JOIN product p on (p.product_id = od.product_id)
GROUP BY od.product_id
ORDER BY
    `count of purchase` desc
limit 5;

-- Most Cheapest ORDER

SELECT
    order_id,
    sum(
        od.`product_Quentity` * p.product_price
    ) as `total Price`
from order_detail od
    JOIN product p on (od.product_id = p.product_id)
GROUP BY od.order_id
ORDER BY `total Price` DESC
LIMIT 1;

-- Most Expensive ORDER

SELECT
    order_id,
    sum(
        od.`product_Quentity` * p.product_price
    ) as `total Price`
from order_detail od
    JOIN product p on (od.product_id = p.product_id)
GROUP BY od.order_id
ORDER BY `total Price` ASC
LIMIT 1;