users:
CREATE TABLE users(
	id INT NOT NULL AUTO_INCREMENT, 
	username VARCHAR(256) UNIQUE NOT NULL,
	password VARCHAR(256) NOT NULL, 
	email VARCHAR(80) UNIQUE NOT NULL, 
	is_verified BOOLEAN, 
	PRIMARY KEY (id));

addresses:
CREATE TABLE `addresses` ( 
	`id` INT NOT NULL AUTO_INCREMENT, 
	`user_id` INT NOT NULL, 
	`country` VARCHAR(70) NOT NULL, 
	`zip_code` INT NOT NULL, 
	`city` VARCHAR(120) NOT NULL, 
	`street` VARCHAR(120) NOT NULL, 
	`house_number` VARCHAR(12) NOT NULL, 
	`phone` INT(20) NOT NULL, 
	`first_name` VARCHAR(60) NOT NULL, 
	`last_name` VARCHAR(60) NOT NULL, 
	PRIMARY KEY (`id`) );


orders:
CREATE TABLE `orders` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`product_id` INT NOT NULL,
	`quantity` INT NOT NULL,
	`status` VARCHAR(20) NOT NULL DEFAULT 'in_cart',
	`address_id` INT NOT NULL DEFAULT 0,
	`invoice` INT NOT NULL DEFAULT 0,
	`order_code` VARCHAR(20) DEFAULT 'not_yet',
	`timestamp` TIMESTAMP DEFAULT 0 ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);

products:
CREATE TABLE `products` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
	`price` DECIMAL(10,2) NOT NULL,
	`category` VARCHAR(60) NOT NULL,
	`description` VARCHAR(1024) NOT NULL DEFAULT 'description',
	`image` VARCHAR(512) NOT NULL DEFAULT 'https://previews.123rf.com/images/arcady31/arcady311202/arcady31120200035/12414954-coffee-break-sign.jpg',
	`in_stock` INT DEFAULT '0',
	PRIMARY KEY (`id`)
);


reviews:
CREATE TABLE reviews(
	id INT NOT NULL AUTO_INCREMENT, 
	user_id INT NOT NULL, 
	product_id INT NOT NULL, 
	rating INT, 
	text VARCHAR(512), 
PRIMARY KEY (id));

