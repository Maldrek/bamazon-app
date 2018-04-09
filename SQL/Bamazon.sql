DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

CREATE TABLE bamazon_products(
`id` int(50) NOT NULL AUTO_INCREMENT,
`item_id` INTEGER(10) NOT NULL,
`product_name` varchar(200) NOT NULL,
`department_name` varchar(50) NOT NULL,
`department_id` INTEGER(20) NOT NULL,
`price` INTEGER(20) NOT NULL,
`stock_quantity` INTEGER(20) NOT NULL,
PRIMARY KEY  (`id`)
);

INSERT INTO bamazon_products(item_id, product_name, department_name, department_id, price, stock_quantity)
VALUE (1, "Laptop", "Electronics", 23, 1200, 25);

INSERT INTO bamazon_products(item_id, product_name, department_name, department_id, price, stock_quantity)
VALUE (2, "How to Code SQL for Dummies", "Books", 15, 25, 20);

INSERT INTO bamazon_products(item_id, product_name, department_name, department_id, price, stock_quantity)
VALUE (3, "50in 4D TV with Telepathic Controls", "Electronics", 23, 25000, 10);

INSERT INTO bamazon_products(item_id, product_name, department_name, department_id, price, stock_quantity)
VALUE (4, "HTML & CSS/Javascript & JQuery Set", "Books", 15, 50, 13);

INSERT INTO bamazon_products(item_id, product_name, department_name, department_id, price, stock_quantity)
VALUE (5, "Ultimate Ninja Blender", "Kitchen", 28, 80, 22);

INSERT INTO bamazon_products(item_id, product_name, department_name, department_id, price, stock_quantity)
VALUE (6, "Spongebob's Spatulomatic", "Kitchen", 28, 15000, 11);

INSERT INTO bamazon_products(item_id, product_name, department_name, department_id, price, stock_quantity)
VALUE (7, "Monopoly, Coder's Edition", "Games & Entertainment", 11, 20, 27);

INSERT INTO bamazon_products(item_id, product_name, department_name, department_id, price, stock_quantity)
VALUE (8, "Black Panther Special Edition", "Movies", 8, 20, 18);

INSERT INTO bamazon_products(item_id, product_name, department_name, department_id, price, stock_quantity)
VALUE (9, "Iphone 14XSMDLMNOP in Rose Gold (all attachments sold seperately)", "Electronics", 23, 250000, 6);

INSERT INTO bamazon_products(item_id, product_name, department_name, department_id, price, stock_quantity)
VALUE (10, "Uno", "Games & Entertainment", 11, 10, 25);

INSERT INTO bamazon_products(item_id, product_name, department_name, department_id, price, stock_quantity)
VALUE (11, "A Quiet Place", "Movies", 8, 20, 19);

SELECT* FROM bamazon_products;
