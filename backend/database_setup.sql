-- Create User Information Table
CREATE TABLE IF NOT EXISTS user_information (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    user_fname VARCHAR(100) NOT NULL,
    user_lname VARCHAR(100) NOT NULL,
    useremail VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Create Item Listing Table
CREATE TABLE IF NOT EXISTS item_listing (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    itemtitle VARCHAR(100) NOT NULL,
    itemdescription TEXT NOT NULL,
    itemprice FLOAT NOT NULL,
    itemavailability BOOLEAN NOT NULL,
    itemposteddate DATETIME NOT NULL,
    FOREIGN KEY (userid) REFERENCES user_information(userid)
);

-- Create Transaction Info Table
CREATE TABLE IF NOT EXISTS transaction_history (
    trans_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    user_id INT NOT NULL,
    transdate DATETIME NOT NULL,
    trans_status VARCHAR(50) NOT NULL,
    FOREIGN KEY (item_id) REFERENCES item_listing(item_id),
    FOREIGN KEY (user_id) REFERENCES user_information(userid)
);

-- Create Trading Post Table
CREATE TABLE IF NOT EXISTS trading_post (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    postlocation VARCHAR(100) NOT NULL,
    post_availability BOOLEAN NOT NULL
);

-- Create Admin Info Table
CREATE TABLE IF NOT EXISTS admin_information (
    adminid INT AUTO_INCREMENT PRIMARY KEY,
    admin_username VARCHAR(100) UNIQUE NOT NULL,
    admin_password VARCHAR(100) NOT NULL
);
