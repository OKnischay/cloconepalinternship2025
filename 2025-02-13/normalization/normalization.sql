-- Problem 1

CREATE TABLE customers (
	customer_id SERIAL PRIMARY KEY,
	customer_name VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
	order_id SERIAL PRIMARY KEY,
	customer_id INT REFERENCES customers(customer_id) NOT NULL,
	order_date DATE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE (
	id SERIAL PRIMARY KEY,
	order_id INT REFERENCES orders(order_id) NOT NULL,
	order_items VARCHAR(255) NOT NULL
);

-- Problem 2

CREATE TABLE students (
	student_id SERIAL PRIMARY KEY,
	student_name VARCHAR(255) NOT NULL,
	semester VARCHAR(255) NOT NULL
);

CREATE TABLE courses (
	course_id SERIAL PRIMARY KEY,
	course_name VARCHAR(255) NOT NULL,
	instructor_name VARCHAR(255) NOT NULL
);

CREATE TABLE enrolled (
	id SERIAL PRIMARY KEY,
	student_id INT REFERENCES students(student_id) NOT NULL,
	course_id INR REFERENCES courses(course_id) NOT NULL
);

--Problem 3
CREATE TABLE departments (
	department_id SERIAL PRIMARY KEY,
	department_name VARCHAR(255) NOT NULL,
	manager_name VARCHAR(255) NOT NULL
);


CREATE TABLE employees (
	employee_id SERIAL PRIMARY KEY,
	employee_name VARCHAR(255) NOT NULL,
	department_id REFERENCES departments(department_id) NOT NULL
);


