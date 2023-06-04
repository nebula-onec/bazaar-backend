create database master;
use master;
create table admin(
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    email varchar(255) UNIQUE,
    phone varchar(20),
    password varchar(1024) NOT NULL,
    db varchar(200) NOT NULL
);

-- Super Admin with admin_id = 1, 'dipanshuj09@gmail.com', 'dipanshuj09'
INSERT INTO admin VALUES (1, 'dipanshuj09@gmail.com', '9425879458', '$2a$10$okZN78SvSqZ.D0FrkIUdMOuEb7qRX1aR5KoeEpujfh5Ps/UadSjlO', ''),
(2, 'kartik@gmail.com', '9875625487', '$2a$10$7jEYSF8eGRu0EaUPDC1nPOFGOiFpfBolVOo9rWJcp69HIzyzurNYG', 'client1'),
(3, 'abhishek@gmail.com', '9658745896', '$2a$10$7jEYSF8eGRu0EaUPDC1nPOFGOiFpfBolVOo9rWJcp69HIzyzurNYG', 'client1');


create database client1;
use client1;

create table home(
    orders INT,
    n_customers INT,
    n_products INT,
    unavailable_products INT,
    n_sold INT
);
INSERT INTO home VALUES(3,5,10,2,10);
CREATE TABLE user(
	user_id 	INT PRIMARY KEY AUTO_INCREMENT,
    name 		VARCHAR(255) NOT NULL,
    phone       VARCHAR(20) DEFAULT NULL,
    email 		VARCHAR(255) NOT NULL UNIQUE,
    password 	VARCHAR(255) NOT NULL,
    cart         JSON 
);
CREATE TABLE address(
	user_id 	INT NOT NULL,            
    address_id 	INT PRIMARY KEY AUTO_INCREMENT,
    street1 	VARCHAR(255) NOT NULL,
    street2 	VARCHAR(255),
    city 		VARCHAR(50) NOT NULL,
    zipcode 	DECIMAL(6) NOT NULL,
	CONSTRAINT address_user_id_fk FOREIGN KEY ( user_id )
        REFERENCES user ( user_id )
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE category (
    category_id 	INT PRIMARY KEY AUTO_INCREMENT,
    category_name 	VARCHAR(255) NOT NULL
);

INSERT INTO category(category_name) VALUES ('Laptop'), ('Desktop'), ('Smartphone'), ('Tablet');

CREATE TABLE product (
    product_id 		INT PRIMARY KEY AUTO_INCREMENT,
    product_name 			VARCHAR(255) NOT NULL,
    price 			DECIMAL(10, 2) NOT NULL,
    category_id     INT DEFAULT NULL,
    description_short     VARCHAR(120),
    description_long      varchar(1000),
    stock    		INT NOT NULL,
    images       varchar(800) NOT NULL,
	CONSTRAINT product_category_id_fk FOREIGN KEY ( category_id )
        REFERENCES category ( category_id )
		ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO product(product_name, price, category_id, description_short, description_long, stock, images) VALUES 
('Samsung Galaxy M33 5G', 16999, 3, 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience', 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience. 16.72 centimeters (6.6-inch) LCD Display, FHD+ resolution, 1080x2400 pixels protected by Gorilla Glass 5. Versatile Quad camera setup-50MP (F1.8)+ 5MP (F2.2/UW- 123 FOV) + 2MP (F2.4/Depth) + 2MP (F2.4/Macro) QuadCamera| 8MP (F1.8) Front Camera', 100, 'smartphone001'),
('Realme Narzo N55 5G', 15000, 3, 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience', 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience. 16.72 centimeters (6.6-inch) LCD Display, FHD+ resolution, 1080x2400 pixels protected by Gorilla Glass 5. Versatile Quad camera setup-50MP (F1.8)+ 5MP (F2.2/UW- 123 FOV) + 2MP (F2.4/Depth) + 2MP (F2.4/Macro) QuadCamera| 8MP (F1.8) Front Camera', 100, 'smartphone001'),
('Redmi A01 ', 13000, 3, 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience', 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience. 16.72 centimeters (6.6-inch) LCD Display, FHD+ resolution, 1080x2400 pixels protected by Gorilla Glass 5. Versatile Quad camera setup-50MP (F1.8)+ 5MP (F2.2/UW- 123 FOV) + 2MP (F2.4/Depth) + 2MP (F2.4/Macro) QuadCamera| 8MP (F1.8) Front Camera', 100, 'smartphone001'),
('Nokia C12', 10000, 3, 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience', 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience. 16.72 centimeters (6.6-inch) LCD Display, FHD+ resolution, 1080x2400 pixels protected by Gorilla Glass 5. Versatile Quad camera setup-50MP (F1.8)+ 5MP (F2.2/UW- 123 FOV) + 2MP (F2.4/Depth) + 2MP (F2.4/Macro) QuadCamera| 8MP (F1.8) Front Camera', 100, 'smartphone001'),
('Samsung Tab A08', 15000, 4, 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience', 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience. 16.72 centimeters (6.6-inch) LCD Display, FHD+ resolution, 1080x2400 pixels protected by Gorilla Glass 5. Versatile Quad camera setup-50MP (F1.8)+ 5MP (F2.2/UW- 123 FOV) + 2MP (F2.4/Depth) + 2MP (F2.4/Macro) QuadCamera| 8MP (F1.8) Front Camera', 100, 'tablet001'),
('Lenovo Tab M10', 10000, 4, 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience', 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience. 16.72 centimeters (6.6-inch) LCD Display, FHD+ resolution, 1080x2400 pixels protected by Gorilla Glass 5. Versatile Quad camera setup-50MP (F1.8)+ 5MP (F2.2/UW- 123 FOV) + 2MP (F2.4/Depth) + 2MP (F2.4/Macro) QuadCamera| 8MP (F1.8) Front Camera', 100, 'tablet001'),
('Realme Pad 5G', 20000, 4, 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience', 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience. 16.72 centimeters (6.6-inch) LCD Display, FHD+ resolution, 1080x2400 pixels protected by Gorilla Glass 5. Versatile Quad camera setup-50MP (F1.8)+ 5MP (F2.2/UW- 123 FOV) + 2MP (F2.4/Depth) + 2MP (F2.4/Macro) QuadCamera| 8MP (F1.8) Front Camera', 100, 'tablet001'),
('Apple Notebook', 80000, 4, 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience', 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience. 16.72 centimeters (6.6-inch) LCD Display, FHD+ resolution, 1080x2400 pixels protected by Gorilla Glass 5. Versatile Quad camera setup-50MP (F1.8)+ 5MP (F2.2/UW- 123 FOV) + 2MP (F2.4/Depth) + 2MP (F2.4/Macro) QuadCamera| 8MP (F1.8) Front Camera', 100, 'tablet001'),
('Lenovo ThinkCenter', 50000, 2, 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience', 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience. 16.72 centimeters (6.6-inch) LCD Display, FHD+ resolution, 1080x2400 pixels protected by Gorilla Glass 5. Versatile Quad camera setup-50MP (F1.8)+ 5MP (F2.2/UW- 123 FOV) + 2MP (F2.4/Depth) + 2MP (F2.4/Macro) QuadCamera| 8MP (F1.8) Front Camera', 100, 'desktop001'),
('HP All in One PC', 40000, 2, 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience', 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience. 16.72 centimeters (6.6-inch) LCD Display, FHD+ resolution, 1080x2400 pixels protected by Gorilla Glass 5. Versatile Quad camera setup-50MP (F1.8)+ 5MP (F2.2/UW- 123 FOV) + 2MP (F2.4/Depth) + 2MP (F2.4/Macro) QuadCamera| 8MP (F1.8) Front Camera', 100, 'desktop001'),
('HP Slim Desktop PC', 60000, 2, 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience', 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience. 16.72 centimeters (6.6-inch) LCD Display, FHD+ resolution, 1080x2400 pixels protected by Gorilla Glass 5. Versatile Quad camera setup-50MP (F1.8)+ 5MP (F2.2/UW- 123 FOV) + 2MP (F2.4/Depth) + 2MP (F2.4/Macro) QuadCamera| 8MP (F1.8) Front Camera', 100, 'desktop001'),
('Lenovo Ideacenter 3', 40000, 2, 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience', 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience. 16.72 centimeters (6.6-inch) LCD Display, FHD+ resolution, 1080x2400 pixels protected by Gorilla Glass 5. Versatile Quad camera setup-50MP (F1.8)+ 5MP (F2.2/UW- 123 FOV) + 2MP (F2.4/Depth) + 2MP (F2.4/Macro) QuadCamera| 8MP (F1.8) Front Camera', 100, 'desktop001'),
('HP s14', 38000, 1, 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience', 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience. 16.72 centimeters (6.6-inch) LCD Display, FHD+ resolution, 1080x2400 pixels protected by Gorilla Glass 5. Versatile Quad camera setup-50MP (F1.8)+ 5MP (F2.2/UW- 123 FOV) + 2MP (F2.4/Depth) + 2MP (F2.4/Macro) QuadCamera| 8MP (F1.8) Front Camera', 100, 'laptop001'),
('HP Pavilian Gaming', 45000, 1, 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience', 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience. 16.72 centimeters (6.6-inch) LCD Display, FHD+ resolution, 1080x2400 pixels protected by Gorilla Glass 5. Versatile Quad camera setup-50MP (F1.8)+ 5MP (F2.2/UW- 123 FOV) + 2MP (F2.4/Depth) + 2MP (F2.4/Macro) QuadCamera| 8MP (F1.8) Front Camera', 100, 'laptop001'),
('Dell Vostro', 50000, 1, 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience', 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience. 16.72 centimeters (6.6-inch) LCD Display, FHD+ resolution, 1080x2400 pixels protected by Gorilla Glass 5. Versatile Quad camera setup-50MP (F1.8)+ 5MP (F2.2/UW- 123 FOV) + 2MP (F2.4/Depth) + 2MP (F2.4/Macro) QuadCamera| 8MP (F1.8) Front Camera', 100, 'laptop001'),
('Asus Gaming', 51000, 1, 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience', 'Exynos 1280 Octa Core 2.4GHz 5nm Processor with the 12 band support for a True 5G experience. 16.72 centimeters (6.6-inch) LCD Display, FHD+ resolution, 1080x2400 pixels protected by Gorilla Glass 5. Versatile Quad camera setup-50MP (F1.8)+ 5MP (F2.2/UW- 123 FOV) + 2MP (F2.4/Depth) + 2MP (F2.4/Macro) QuadCamera| 8MP (F1.8) Front Camera', 100, 'laptop001');

-- create table images(
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     product_id INT NOT NULL,
--     public_id varchar(256) NOT NULL,
--     secure_url varchar(1025) NOT NULL,
--     constraint images_product_id_fk FOREIGN KEY ( product_id )
--         REFERENCES product ( product_id )
--         ON DELETE CASCADE ON UPDATE CASCADE
-- );




-- CREATE TABLE payment_option(
-- 	payment_id 	INT PRIMARY KEY AUTO_INCREMENT,
--     desciption 	VARCHAR(200) NOT NULL
-- );


CREATE TABLE user_order(
    order_id              INT PRIMARY KEY AUTO_INCREMENT,
    buyer_id              INT ,
    address_id 			  INT NOT NULL,
    total_price           DECIMAL(10, 2) NOT NULL,
    shipping_price        DECIMAL(4, 2) NOT NULL,
    order_date            DATETIME DEFAULT CURRENT_TIMESTAMP,
    shipping_date         DATETIME,
    delievered_date		  DATETIME,
    order_status          DECIMAL(1) DEFAULT 1,
    CONSTRAINT user_order_buyer_id_fk FOREIGN KEY ( buyer_id )
        REFERENCES user ( user_id )
		ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT user_order_address_id_fk FOREIGN KEY ( address_id )
        REFERENCES address ( address_id )
		ON DELETE RESTRICT ON UPDATE CASCADE
);
-- In order status, 1-order placed, 2-order-shipped, 3-order delievered, 0-order cancelled

 
CREATE TABLE order_product (
    order_id     INT,
    product_id   INT,
    quantity INT NOT NULL,
    price INT NOT NULL,
    PRIMARY KEY ( order_id,
                  product_id ),
	CONSTRAINT order_product_order_id_fk FOREIGN KEY ( order_id )
        REFERENCES user_order ( order_id )
		ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT order_product_product_id_fk FOREIGN KEY ( product_id )
        REFERENCES product ( product_id )
		ON DELETE RESTRICT ON UPDATE CASCADE
);




insert into user (name, email, phone, password, cart) values ('Karik','kartik@gmail.com', '7440747707', '12345678', '{"1":1, "2":3}'),
('Akshat Kotwalla', 'akshat@gmail.com', '7440747707', '12345678', '{"1":1, "2":3}'),
('Tanish Jain', 'tanish@gmail.com', '7440747707', '12345678', '{"1":1, "2":3}');


insert into address (user_id, street1, city, zipcode) values
(1, "Murai Mohalla", 'Indore', 45120),
(2, "Choti Gwaltoli", "Bhopal", 45470),
(3, "Teen Imli", "Patna", 45810);


INSERT INTO `user_order` (order_id, buyer_id, address_id, total_price, shipping_price, order_status) 
VALUES (4,1,1,114500.00,50.00,3),
(5,1,1,100000.00,50.00,1),
(6,3,3,240000.00,50.00,1);

INSERT INTO `order_product` VALUES (4,1,1,14500),(4,4,1,100000),(5,5,1,100000),(6,3,2,240000);


insert into user (user_id, name, email, phone, password, cart) values (15, 'Karik','kartik@gmail.com', '7440747707', '12345678', '{"1":1, "2":3}'),
INSERT INTO `user_order` (order_id, buyer_id, address_id, total_price, shipping_price, order_status) 
VALUES (15,15,1,114500.00,50.00,3),
(16,15,1,100000.00,50.00,1),
(17,15,3,240000.00,50.00,1),
(18,15,1,114500.00,50.00,3),
(19,15,1,114500.00,50.00,3),
(20,15,1,114500.00,50.00,3),
(21,15,1,100000.00,50.00,1),
(22,15,3,240000.00,50.00,1),
(23,15,1,114500.00,50.00,3),
(24,15,1,114500.00,50.00,3),
(25,15,1,114500.00,50.00,3),
(26,15,1,100000.00,50.00,1),
(27,15,3,240000.00,50.00,1),
(28,15,1,114500.00,50.00,3),
(29,15,1,114500.00,50.00,3);

INSERT INTO `order_product` VALUES 
(15,1,1,14500),
(15,4,1,100000),
(16,5,1,100000),
(16,3,2,240000),
(17,2,3,14500),
(18,4,1,100000),
(19,5,1,100000),
(20,3,2,240000),
(21,8,1,14500),
(22,6,1,100000),
(23,2,1,100000),
(24,1,2,240000),
(25,1,1,14500),
(26,4,1,100000),
(27,5,1,100000),
(28,8,2,240000),
(29,3,2,240000);


-- {
--     product_id: NUMBER ,
--     product_name: string,
--     price: NUMBER,
--     category_id: NUMBER,
--     category_name: string, 
--     description_short: string,
--     description_long: string,
--     stock: NUMBER,
--     images: [
--         {
--             public_id: string,
--             secure_url: string
--         },
--         {
--             public_id: string,
--             secure_url: string
--         },
--     ]
-- }

