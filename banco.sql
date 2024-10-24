CREATE DATABASE IF NOT EXISTS mybanco;

-- Use the database
USE mybanco;

-- Create the table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

