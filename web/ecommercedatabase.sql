-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 22, 2025 at 08:58 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommercedatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `AddressID` int(11) NOT NULL,
  `UserID` varchar(60) NOT NULL,
  `IsDeleted` tinyint(1) DEFAULT 0,
  `IsPriority` tinyint(1) DEFAULT 0,
  `Address` varchar(300) NOT NULL,
  `City` varchar(300) NOT NULL,
  `ZIP_Code` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`AddressID`, `UserID`, `IsDeleted`, `IsPriority`, `Address`, `City`, `ZIP_Code`) VALUES
(1, '$2b$10$PrpxRiszf1cAM52tOugqf.mqOGq6aWDKfB9ylNhpIRrgzpB3Yy5QG', 0, 1, 'U2FsdGVkX19C5sqWYZoebX5nvqHpFfFkR5PMbKVD2GU=', 'U2FsdGVkX1+1OIf4WaRN9ghGkC4sBegQRUyocG1uK/U=', 'U2FsdGVkX1/FXcyjXDR4+j39epjpoz5ngEMaAUSUIT8=');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `PaymentID` int(11) NOT NULL,
  `IsDeleted` tinyint(1) DEFAULT 0,
  `IsPriority` tinyint(1) DEFAULT 0,
  `UserID` varchar(60) NOT NULL,
  `Card_Name` varchar(300) NOT NULL,
  `Card_Number` varchar(300) NOT NULL,
  `CVV` varchar(300) NOT NULL,
  `Card_Exp_Date` varchar(300) NOT NULL
);

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`PaymentID`, `IsDeleted`, `IsPriority`, `UserID`, `Card_Name`, `Card_Number`, `CVV`, `Card_Exp_Date`) VALUES
(1, 0, 1, '$2b$10$PrpxRiszf1cAM52tOugqf.mqOGq6aWDKfB9ylNhpIRrgzpB3Yy5QG', 'U2FsdGVkX1/hIkTDsmh64cL71B46tdbhk8viencrg/A=', 'U2FsdGVkX1/BirBgq360Vp4jsV/h7eGGh3mrnORECbbRkUB6S+IDz/ZmT0CQY9A5', 'U2FsdGVkX1+995/KK3zRsHHHBwpR1moeygHnl44x4SA=', 'U2FsdGVkX18DbpCnNxgEa0aUa/sLktLPRx2aqn/kZd0=');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `color1` varchar(50) DEFAULT NULL,
  `color2` varchar(50) DEFAULT NULL,
  `color3` varchar(50) DEFAULT NULL,
  `color_1_S_stock` int(11) DEFAULT 0,
  `color_1_M_stock` int(11) DEFAULT 0,
  `color_1_L_stock` int(11) DEFAULT 0,
  `color_1_XL_stock` int(11) DEFAULT 0,
  `color_2_S_stock` int(11) DEFAULT 0,
  `color_2_M_stock` int(11) DEFAULT 0,
  `color_2_L_stock` int(11) DEFAULT 0,
  `color_2_XL_stock` int(11) DEFAULT 0,
  `color_3_S_stock` int(11) DEFAULT 0,
  `color_3_M_stock` int(11) DEFAULT 0,
  `color_3_L_stock` int(11) DEFAULT 0,
  `color_3_XL_stock` int(11) DEFAULT 0,
  `discount_percentage` decimal(5,2) DEFAULT 0.00,
  `category` varchar(100) DEFAULT NULL,
  `cloth_type` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `name`, `description`, `price`, `color1`, `color2`, `color3`, `color_1_S_stock`, `color_1_M_stock`, `color_1_L_stock`, `color_1_XL_stock`, `color_2_S_stock`, `color_2_M_stock`, `color_2_L_stock`, `color_2_XL_stock`, `color_3_S_stock`, `color_3_M_stock`, `color_3_L_stock`, `color_3_XL_stock`, `discount_percentage`, `category`, `cloth_type`, `created_at`, `updated_at`) VALUES
(1, 'Basic Red T-Shirt', 'A classic red t-shirt made from 100% cotton, featuring a comfortable fit and soft fabric. Perfect for casual wear and layering.', 19.99, '#FF0000', '#8B0000', NULL, 50, 60, 40, 30, 10, 15, 20, 10, 0, 0, 0, 0, 0.00, 'Men', 'T-Shirt', '2025-01-26 14:27:40', '2025-01-26 14:27:40'),
(2, 'Striped Blue Shirt', 'A stylish blue and white striped shirt made from breathable cotton, perfect for both casual and semi-formal occasions. It features a slim fit with a button-down collar.', 34.99, '#0000FF', '#FFFFFF', NULL, 20, 25, 15, 10, 15, 10, 5, 5, 0, 0, 0, 0, 10.00, 'Men', 'Shirt', '2025-01-26 14:27:40', '2025-01-29 09:00:20'),
(3, 'Gray Knit Sweater', 'This cozy gray knit sweater is perfect for chilly weather. Made from a soft wool blend, it features a ribbed design and a comfortable, relaxed fit.', 49.99, '#808080', '#A9A9A9', NULL, 30, 40, 20, 10, 20, 25, 15, 5, 0, 0, 0, 0, 0.00, 'Women', 'Sweater', '2025-01-26 14:27:40', '2025-01-29 15:10:05'),
(4, 'Black Leather Shoes', 'These premium black leather shoes are designed for both comfort and elegance. Perfect for formal events or daily wear, they feature a durable sole and stylish design.', 89.99, '#000000', 'N/A', NULL, 50, 50, 30, 20, 15, 10, 10, 5, 0, 0, 0, 0, 0.00, 'Men', 'Shoes', '2025-01-26 14:27:40', '2025-01-26 14:27:40'),
(5, 'Blue Denim Jacket', 'This classic blue denim jacket features a timeless design with button closure, two front pockets, and durable stitching. Perfect for casual outings and layering over any outfit.', 59.99, '#0000FF', '#ADD8E6', NULL, 15, 25, 10, 5, 5, 10, 5, 5, 0, 0, 0, 0, 0.00, 'Women', 'Jacket', '2025-01-26 14:27:40', '2025-01-26 14:27:40'),
(6, 'Dark Green Cargo Pants', 'These durable dark green cargo pants are made from heavy-duty cotton and feature multiple pockets for added functionality. Ideal for outdoor activities or casual wear.', 39.99, '#006400', '#808000', NULL, 30, 40, 20, 10, 15, 10, 5, 5, 0, 0, 0, 0, 0.00, 'Boys', 'Pants', '2025-01-26 14:27:40', '2025-01-26 14:27:40'),
(7, 'Black Graphic T-Shirt', 'A trendy black graphic t-shirt made from soft cotton fabric, featuring a unique, artistic print. Ideal for streetwear or casual wear.', 24.99, '#000000', '#FFD700', NULL, 50, 50, 40, 20, 15, 10, 15, 20, 0, 0, 0, 0, 0.00, 'Girls', 'T-Shirt', '2025-01-26 14:27:40', '2025-01-26 14:27:40'),
(8, 'Checked Flannel Shirt', 'This warm flannel shirt is perfect for fall and winter. Featuring a classic checked pattern, it can be worn as a shirt or jacket for added versatility.', 39.99, '#FF6347', '#FFD700', NULL, 40, 50, 30, 20, 10, 10, 10, 10, 0, 0, 0, 0, 0.00, 'Women', 'Shirt', '2025-01-26 14:27:40', '2025-01-26 14:27:40'),
(9, 'Woolen Red Sweater', 'This red woolen sweater is perfect for cold weather. Featuring a classic crew neck and ribbed cuffs, it offers both style and warmth.', 49.99, '#FF0000', '#B22222', NULL, 25, 30, 20, 15, 10, 5, 5, 5, 0, 0, 0, 0, 0.00, 'Women', 'Sweater', '2025-01-26 14:27:40', '2025-01-26 14:27:40'),
(10, 'Brown Leather Boots', 'These durable brown leather boots are perfect for winter. Featuring a rugged sole and a warm lining, they are both stylish and practical for any occasion.', 79.99, '#8B4513', '#D2691E', NULL, 20, 25, 15, 10, 10, 5, 5, 5, 0, 0, 0, 0, 10.00, 'Men', 'Shoes', '2025-01-26 14:27:40', '2025-01-29 09:00:28'),
(11, 'Bomber Jacket', 'This stylish bomber jacket features a sleek design with a zippered front, ribbed cuffs, and a durable outer shell. Perfect for both casual and semi-formal outfits.', 69.99, '#000000', '#C0C0C0', NULL, 10, 20, 15, 10, 5, 10, 5, 5, 0, 0, 0, 0, 0.00, 'Men', 'Jacket', '2025-01-26 14:27:40', '2025-01-26 14:27:40'),
(12, 'Black Slim Fit Jeans', 'These slim-fit black jeans are made from high-quality denim. They offer a modern, stylish look with just the right amount of stretch for added comfort.', 44.99, '#000000', '#333333', NULL, 50, 60, 40, 30, 20, 25, 15, 20, 0, 0, 0, 0, 20.00, 'Boys', 'Pants', '2025-01-26 14:27:40', '2025-01-29 14:19:25'),
(13, 'V-Neck White T-Shirt', 'This white V-neck t-shirt is made from soft cotton and provides a comfortable fit for everyday wear. Ideal for layering or wearing on its own.', 18.99, '#FFFFFF', '#B0E0E6', NULL, 40, 50, 30, 20, 25, 20, 15, 10, 0, 0, 0, 0, 0.00, 'Girls', 'T-Shirt', '2025-01-26 14:27:40', '2025-01-26 14:27:40'),
(14, 'Khaki Button-Up Shirt', 'This versatile khaki button-up shirt can be dressed up or down. Made from breathable cotton, it features a classic fit and is perfect for any occasion.', 34.99, '#F0E68C', '#D2B48C', NULL, 30, 40, 25, 10, 20, 15, 10, 10, 0, 0, 0, 0, 0.00, 'Men', 'Shirt', '2025-01-26 14:27:40', '2025-01-26 14:27:40'),
(15, 'Cashmere Black Sweater', 'This luxurious black cashmere sweater offers a refined and comfortable look. Perfect for layering or wearing on its own, it’s a staple for any wardrobe.', 99.99, '#000000', '#696969', NULL, 15, 25, 10, 5, 20, 25, 20, 10, 0, 0, 0, 0, 0.00, 'Women', 'Sweater', '2025-01-26 14:27:40', '2025-01-26 14:27:40'),
(16, 'Sporty Sneakers', 'These sporty sneakers are made with breathable mesh and a flexible sole for maximum comfort during physical activity. Ideal for running or casual wear.', 59.99, '#1E90FF', '#FFFFFF', NULL, 50, 50, 40, 30, 15, 10, 10, 15, 0, 0, 0, 0, 0.00, 'Men', 'Shoes', '2025-01-26 14:27:40', '2025-01-26 14:27:40'),
(17, 'Puffer Jacket', 'This puffer jacket features a cozy down-filled design to keep you warm in cold weather. The adjustable cuffs and hem help seal in warmth while offering a stylish look.', 89.99, '#800080', '#DA70D6', NULL, 10, 15, 10, 5, 5, 10, 5, 5, 0, 0, 0, 0, 0.00, 'Women', 'Jacket', '2025-01-26 14:27:40', '2025-01-26 14:27:40'),
(18, 'Light Beige Chinos', 'These light beige chinos are a versatile addition to your wardrobe. Made from cotton with just the right amount of stretch, they offer comfort and a sharp, polished look.', 39.99, '#F5F5DC', '#D3D3D3', NULL, 20, 30, 20, 15, 10, 5, 10, 15, 0, 0, 0, 0, 0.00, 'Boys', 'Pants', '2025-01-26 14:27:40', '2025-01-26 14:27:40');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(60) DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(510) NOT NULL,
  `phone_number` varchar(100) NOT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `date_of_birth` varchar(50) NOT NULL,
  `account_created_at` varchar(100) NOT NULL DEFAULT current_timestamp(),
  `shopping_cart` varchar(500) DEFAULT NULL
);

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`, `phone_number`, `gender`, `date_of_birth`, `account_created_at`, `shopping_cart`) VALUES
('$2b$10$PrpxRiszf1cAM52tOugqf.mqOGq6aWDKfB9ylNhpIRrgzpB3Yy5QG', 'U2FsdGVkX1/lmNkNtKcICxlHhLfLJHURre2WApMSj9k=', 'U2FsdGVkX19CYl8NyUT9AxMaK1sMUKMhWFpjzbr6/P8=', 'deneme123@gmail.com', '$2b$10$bLnNxzq98h9jBBLrH8KHquyn5S7FaS6yStuKUMs7oqPPUN7ZkAqo2', 'U2FsdGVkX1+b7qisHUnngeFQUArmFxbjF33Io3gEoiQ=', 'U2FsdGVkX19+72dgCDzncbrSLyKuTOYI06LCgV43f0w=', 'U2FsdGVkX1+fGfTFCeXDasn5hC+bw6NWF1PWXDacT6c=', 'U2FsdGVkX1+nEzPPdpGx3r8Q/KISjxeVu9aRyOSOsqY=', '[value-14]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`AddressID`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`PaymentID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `AddressID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `PaymentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


CREATE TABLE ecommercedatabase.orders (
    OrderID varchar(100) NOT NULL,
    UserID varchar(100) NOT NULL,
    TotalPrice varchar(100) NOT NULL,
    status ENUM('pending', 'paid', 'shipped', 'delivered', 'canceled', 'refunded') NOT NULL DEFAULT 'pending',
    PaymentID varchar(100) NOT NULL, 
    OrderDate  varchar(100) NOT NULL,
    Products varchar(3000) not null
);
