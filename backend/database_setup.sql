-- Create Schema
CREATE SCHEMA IF NOT EXISTS swe_project;

-- Use the Schema
USE swe_project;

-- Create User Information Table
CREATE TABLE IF NOT EXISTS userinfo (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    user_fname VARCHAR(100) NOT NULL,
    user_lname VARCHAR(100) NOT NULL,
    useremail VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100),
    banned TINYINT,
    security VARCHAR(100) NOT NULL
    );

-- Create Admin Information Table
CREATE TABLE IF NOT EXISTS admin_information (
    adminid INT AUTO_INCREMENT PRIMARY KEY,
    admin_username VARCHAR(100) UNIQUE NOT NULL,
    admin_password VARCHAR(100) NOT NULL
    );

-- Create Item Listing Table
CREATE TABLE IF NOT EXISTS item_listing (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    photo LONGBLOB,
    itemtitle VARCHAR(100) NOT NULL,
    itemdescription TEXT NOT NULL,
    itemprice FLOAT NOT NULL,
    FOREIGN KEY (userid) REFERENCES userinfo(userid)
    );

-- Create Transaction History Table
CREATE TABLE IF NOT EXISTS transaction_history (
    trans_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    user_id INT NOT NULL,
    transdate DATETIME NOT NULL,
    trans_status VARCHAR(50) NOT NULL,
    FOREIGN KEY (item_id) REFERENCES item_listing(item_id),
    FOREIGN KEY (user_id) REFERENCES userinfo(userid)
    );

-- Create Cart Table
CREATE TABLE IF NOT EXISTS cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    userid INT,
    item_id INT,
    FOREIGN KEY (userid) REFERENCES userinfo(userid),
    FOREIGN KEY (item_id) REFERENCES item_listing(item_id)
    );
