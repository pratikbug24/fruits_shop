-- Create a new database
CREATE DATABASE IF NOT EXISTS `login_data`;

-- Use the created database
USE `login_data`;
 
-- Create a table to store user information
CREATE TABLE IF NOT EXISTS `users` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
);

-- Inserting a sample user into the users table
INSERT INTO users (user_name,password,name) VALUES
('Pratik24', 'Pratik@321',"Pratik");
