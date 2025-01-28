CREATE DATABASE IF NOT EXISTS EcommerceDatabase;

use EcommerceDatabase;
CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(20), -- Unique identifier for each user
    first_name VARCHAR(100) NOT NULL, -- User's first name
    last_name VARCHAR(100) NOT NULL, -- User's last name
    email VARCHAR(200) UNIQUE NOT NULL, -- User's email address
    password VARCHAR(510) NOT NULL, -- Hashed password for authentication (encrypted with CryptoJS)
    phone_number VARCHAR(30) NOT NULL, -- User's contact number (encrypted with CryptoJS)
    address_line_1 VARCHAR(510) NOT NULL, -- Primary address line (encrypted with CryptoJS)
    address_line_2 VARCHAR(510) DEFAULT NULL, -- Secondary address line (optional, encrypted with CryptoJS)
    city VARCHAR(100) NOT NULL, -- City of the user (encrypted with CryptoJS)
    zip_code VARCHAR(40) NOT NULL, -- Postal or zip code (encrypted with CryptoJS)
    gender VARCHAR(20), -- Gender (encrypted with CryptoJS)
    date_of_birth VARCHAR(30) NOT NULL, -- Date of birth (optional, encrypted with CryptoJS)
    account_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for account creation
    shopping_cart VARCHAR(500)

    --!Credit card values will be added
);


CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, -- Unique identifier for each product
    name VARCHAR(200) NOT NULL, -- Name of the product
    description TEXT, -- Detailed description of the product
    price DECIMAL(10, 2) NOT NULL, -- Price of the product
    color1 VARCHAR(50), -- First available color
    color2 VARCHAR(50), -- Second available color
    color3 VARCHAR(50), -- Third available color
    color_1_S_stock INT DEFAULT 0, -- Stock for size Small of color1
    color_1_M_stock INT DEFAULT 0, -- Stock for size Medium of color1
    color_1_L_stock INT DEFAULT 0, -- Stock for size Large of color1
    color_1_XL_stock INT DEFAULT 0, -- Stock for size Extra Large of color1
    color_2_S_stock INT DEFAULT 0, -- Stock for size Small of color2
    color_2_M_stock INT DEFAULT 0, -- Stock for size Medium of color2
    color_2_L_stock INT DEFAULT 0, -- Stock for size Large of color2
    color_2_XL_stock INT DEFAULT 0, -- Stock for size Extra Large of color2
    color_3_S_stock INT DEFAULT 0, -- Stock for size Small of color3
    color_3_M_stock INT DEFAULT 0, -- Stock for size Medium of color3
    color_3_L_stock INT DEFAULT 0, -- Stock for size Large of color3
    color_3_XL_stock INT DEFAULT 0, -- Stock for size Extra Large of color3
    discount_percentage DECIMAL(5, 2) DEFAULT 0, -- Discount percentage for the product
    category VARCHAR(100), -- Category of the product(Men,Women,Boys,Girls)
    cloth_type VARCHAR(100), --Shirt,T-Shirt,Sweater etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the product was added
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Timestamp for last update
); 


INSERT INTO products (name, description, price, color1, color2, color_1_S_stock, color_1_M_stock, color_1_L_stock, color_1_XL_stock, color_2_S_stock, color_2_M_stock, color_2_L_stock, color_2_XL_stock, discount_percentage, category, cloth_type) VALUES
('Basic Red T-Shirt', 'A classic red t-shirt made from 100% cotton, featuring a comfortable fit and soft fabric. Perfect for casual wear and layering.', 19.99, '#FF0000', '#8B0000', 50, 60, 40, 30, 10, 15, 20, 10, 0, 'Men', 'T-Shirt'),
('Striped Blue Shirt', 'A stylish blue and white striped shirt made from breathable cotton, perfect for both casual and semi-formal occasions. It features a slim fit with a button-down collar.', 34.99, '#0000FF', '#FFFFFF', 20, 25, 15, 10, 15, 10, 5, 5, 0, 'Men', 'Shirt'),
('Gray Knit Sweater', 'This cozy gray knit sweater is perfect for chilly weather. Made from a soft wool blend, it features a ribbed design and a comfortable, relaxed fit.', 49.99, '#808080', '#A9A9A9', 30, 40, 20, 10, 20, 25, 15, 5, 0, 'Women', 'Sweater'),
('Black Leather Shoes', 'These premium black leather shoes are designed for both comfort and elegance. Perfect for formal events or daily wear, they feature a durable sole and stylish design.', 89.99, '#000000', 'N/A', 50, 50, 30, 20, 15, 10, 10, 5, 0, 'Men', 'Shoes'),
('Blue Denim Jacket', 'This classic blue denim jacket features a timeless design with button closure, two front pockets, and durable stitching. Perfect for casual outings and layering over any outfit.', 59.99, '#0000FF', '#ADD8E6', 15, 25, 10, 5, 5, 10, 5, 5, 0, 'Women', 'Jacket'),
('Dark Green Cargo Pants', 'These durable dark green cargo pants are made from heavy-duty cotton and feature multiple pockets for added functionality. Ideal for outdoor activities or casual wear.', 39.99, '#006400', '#808000', 30, 40, 20, 10, 15, 10, 5, 5, 0, 'Boys', 'Pants'),
('Black Graphic T-Shirt', 'A trendy black graphic t-shirt made from soft cotton fabric, featuring a unique, artistic print. Ideal for streetwear or casual wear.', 24.99, '#000000', '#FFD700', 50, 50, 40, 20, 15, 10, 15, 20, 0, 'Girls', 'T-Shirt'),
('Checked Flannel Shirt', 'This warm flannel shirt is perfect for fall and winter. Featuring a classic checked pattern, it can be worn as a shirt or jacket for added versatility.', 39.99, '#FF6347', '#FFD700', 40, 50, 30, 20, 10, 10, 10, 10, 0, 'Women', 'Shirt'),
('Woolen Red Sweater', 'This red woolen sweater is perfect for cold weather. Featuring a classic crew neck and ribbed cuffs, it offers both style and warmth.', 49.99, '#FF0000', '#B22222', 25, 30, 20, 15, 10, 5, 5, 5, 0, 'Women', 'Sweater'),
('Brown Leather Boots', 'These durable brown leather boots are perfect for winter. Featuring a rugged sole and a warm lining, they are both stylish and practical for any occasion.', 79.99, '#8B4513', '#D2691E', 20, 25, 15, 10, 10, 5, 5, 5, 0, 'Men', 'Shoes'),
('Bomber Jacket', 'This stylish bomber jacket features a sleek design with a zippered front, ribbed cuffs, and a durable outer shell. Perfect for both casual and semi-formal outfits.', 69.99, '#000000', '#C0C0C0', 10, 20, 15, 10, 5, 10, 5, 5, 0, 'Men', 'Jacket'),
('Black Slim Fit Jeans', 'These slim-fit black jeans are made from high-quality denim. They offer a modern, stylish look with just the right amount of stretch for added comfort.', 44.99, '#000000', '#333333', 50, 60, 40, 30, 20, 25, 15, 20, 0, 'Boys', 'Pants'),
('V-Neck White T-Shirt', 'This white V-neck t-shirt is made from soft cotton and provides a comfortable fit for everyday wear. Ideal for layering or wearing on its own.', 18.99, '#FFFFFF', '#B0E0E6', 40, 50, 30, 20, 25, 20, 15, 10, 0, 'Girls', 'T-Shirt'),
('Khaki Button-Up Shirt', 'This versatile khaki button-up shirt can be dressed up or down. Made from breathable cotton, it features a classic fit and is perfect for any occasion.', 34.99, '#F0E68C', '#D2B48C', 30, 40, 25, 10, 20, 15, 10, 10, 0, 'Men', 'Shirt'),
('Cashmere Black Sweater', 'This luxurious black cashmere sweater offers a refined and comfortable look. Perfect for layering or wearing on its own, it’s a staple for any wardrobe.', 99.99, '#000000', '#696969', 15, 25, 10, 5, 20, 25, 20, 10, 0, 'Women', 'Sweater'),
('Sporty Sneakers', 'These sporty sneakers are made with breathable mesh and a flexible sole for maximum comfort during physical activity. Ideal for running or casual wear.', 59.99, '#1E90FF', '#FFFFFF', 50, 50, 40, 30, 15, 10, 10, 15, 0, 'Men', 'Shoes'),
('Puffer Jacket', 'This puffer jacket features a cozy down-filled design to keep you warm in cold weather. The adjustable cuffs and hem help seal in warmth while offering a stylish look.', 89.99, '#800080', '#DA70D6', 10, 15, 10, 5, 5, 10, 5, 5, 0, 'Women', 'Jacket'),
('Light Beige Chinos', 'These light beige chinos are a versatile addition to your wardrobe. Made from cotton with just the right amount of stretch, they offer comfort and a sharp, polished look.', 39.99, '#F5F5DC', '#D3D3D3', 20, 30, 20, 15, 10, 5, 10, 15, 0, 'Boys', 'Pants');




CREATE TABLE IF NOT EXISTS orders (
    OrderID TEXT PRIMARY KEY,         -- Encrypted OrderID (stored as text)
    UserID TEXT NOT NULL,             -- Encrypted UserID (stored as text)
    TotalPrice TEXT NOT NULL,         -- Encrypted TotalPrice (stored as text)
    Products TEXT NOT NULL,           -- Encrypted products (stored as text)
    OrderStatus TEXT NOT NULL,        -- Encrypted OrderStatus (stored as text)
    BillingAddress TEXT NOT NULL,     -- Encrypted BillingAddress (stored as text)
    ShippingAddress TEXT NOT NULL,    -- Encrypted ShippingAddress (stored as text)
    FOREIGN KEY (UserID) REFERENCES users(UserID)  -- Assuming a 'users' table exists

    --!Add credit card values
);









