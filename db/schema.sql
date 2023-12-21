DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;


--Creating table for department
CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

