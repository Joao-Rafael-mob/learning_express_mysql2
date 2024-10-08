-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS teste;

-- Use the database
USE teste;

-- Create the table
CREATE TABLE pessoas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    idade INT,
    senha VARCHAR(255)
);
