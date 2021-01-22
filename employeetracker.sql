DROP DATABASE IF EXISTS employeetracker_db;
CREATE DATABASE employeetracker_db;

USE employeetracker_db;

CREATE TABLE departments (
id INT AUTO_INCREMENT,
dept_name VARCHAR(30),
PRIMARY KEY (id)
);
INSERT INTO departments (dept_name) VALUES ("Acquisitions");

CREATE TABLE roles (
id INT AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL (10,2),
department_id INT,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
id INT AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR (30),
role_id INT,
manager_id INT,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES roles (id),
FOREIGN KEY (manager_id) REFERENCES departments (id)
);



INSERT INTO departments (dept_name) VALUES ("Acquisitions");

INSERT INTO roles (title, salary) VALUES ("Manager", 90,000.00);

INSERT INTO employees (first_name, last_name) VALUES ("Rex", "Flores");

SELECT * FROM employeetracker_db;
