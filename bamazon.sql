DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT (10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR (30) NULL,
    department_name VARCHAR (30) NULL,
    price DEC (5,2) NULL,
    stock_quantity INT (5) NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("portable charger", "electronics", 10.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dog leash", "pets", 5.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("microwave", "kitchen", 100.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("salt and pepper shakers", "kitchen", 3.00, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("queen size bed set", "home", 40.95, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("keyboard", "electronics", 10.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("blender", "kitchen", 15.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("food and water bowl", "pets", 6.59, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laptop", "electronics", 500.99, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("knife set", "kitchen", 35.00, 12);

select * from products;