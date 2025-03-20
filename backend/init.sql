CREATE DATABASE IF NOT EXISTS donation_db;
USE donation_db;

ALTER USER 'user'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS charityadd (
  id INT AUTO_INCREMENT PRIMARY KEY,
  charity_name VARCHAR(255),
  category VARCHAR(255),
  goal_description TEXT,
  event_description TEXT,
  photo_org VARCHAR(255),
  achievement TEXT,
  registration_no VARCHAR(100),
  email VARCHAR(255),
  income_tax VARCHAR(100),
  pan_no VARCHAR(50),
  gst_no VARCHAR(50),
  annual_report VARCHAR(255),
  website VARCHAR(255),
  phone_no VARCHAR(20),
  address TEXT,
  payment_id VARCHAR(255),
  order_id VARCHAR(255),
  payment_signature VARCHAR(255)
  eligible VARCHAR(255) DEFAULT 'no'
);

 