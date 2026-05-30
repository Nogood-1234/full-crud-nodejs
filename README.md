# Day 5 Mini Project: Express CRUD API with MySQL

This project is a small Node.js and Express API used for practicing CRUD routes, validation, MySQL queries, and centralized error handling.

Students can clone this repository, install the dependencies, create the database tables, and test the API endpoints with a browser, Postman, Thunder Client, or `curl`.

## What This Project Teaches

- How to create an Express server
- How to organize routes with `express.Router()`
- How to connect Express to MySQL using `mysql2`
- How to build CRUD endpoints for users and products
- How to validate request bodies with `express-validator`
- How to use `next(err)` and centralized error handling
- How to return proper JSON responses and HTTP status codes

## Project Structure

```text
.
|-- app.js
|-- middleware
|   `-- errorHandler.js
|-- package.json
`-- routes
    |-- products.js
    `-- users.js
```

## Prerequisites

Before running this project, make sure you have:

- Node.js installed
- npm installed
- MySQL running locally
- A MySQL database named `nodejsclass`

The current MySQL connection settings are:

```js
host: 'localhost'
user: 'root'
password: 'root123'
port: 3308
database: 'nodejsclass'
```

If your MySQL username, password, port, or database name is different, update the connection settings in:

- `routes/users.js`
- `routes/products.js`

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd 03-mini-project-day5
```

Install dependencies:

```bash
npm install
```

## Database Setup

Open MySQL and create the database:

```sql
CREATE DATABASE nodejsclass;
USE nodejsclass;
```

Create the `users` table:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL
);
```

Create the `products` table:

```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);
```

Optional sample data:

```sql
INSERT INTO users (name, email) VALUES
('Bobby', 'bobby@example.com'),
('Noy', 'noy@example.com');

INSERT INTO products (name, price) VALUES
('Notebook', 2.50),
('Pen', 1.00);
```

## Running the Server

Start the API:

```bash
node app.js
```

You should see:

```text
Server running -> http://localhost:3000
```

The API runs on:

```text
http://localhost:3000
```

## API Endpoints

### Users

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get one user by ID |
| POST | `/users` | Create a new user |
| PUT | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |

### Products

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get one product by ID |
| POST | `/products` | Create a new product |
| PUT | `/products/:id` | Update a product |
| DELETE | `/products/:id` | Delete a product |

## Example Requests

### Create a User

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Bobby","email":"bobby@example.com"}'
```

### Get All Users

```bash
curl http://localhost:3000/users
```

### Update a User

```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Bobby Updated","email":"bobby.updated@example.com"}'
```

### Delete a User

```bash
curl -X DELETE http://localhost:3000/users/1
```

### Create a Product

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Notebook","price":2.5}'
```

### Get All Products

```bash
curl http://localhost:3000/products
```

## Validation Rules

### Users

- `name` is required
- `email` must be a valid email address

Example invalid user request:

```json
{
  "name": "",
  "email": "wrong-email"
}
```

### Products

- `name` is required
- `price` must be a non-negative number

Example invalid product request:

```json
{
  "name": "",
  "price": -5
}
```

## Error Handling

This project uses a centralized error handler in:

```text
middleware/errorHandler.js
```

Routes pass database errors to the error handler with:

```js
next(err);
```

This keeps route files cleaner and avoids repeating the same error response logic in every route.

## Notes for Students

- `app.js` is the main entry point of the application.
- `routes/users.js` contains all user CRUD routes.
- `routes/products.js` contains all product CRUD routes.
- `middleware/errorHandler.js` catches errors passed from route files.
- Always send JSON data with the `Content-Type: application/json` header when using `POST` or `PUT`.
- Make sure MySQL is running before starting the server.

## Common Problems

### Cannot connect to MySQL

Check that:

- MySQL is running
- The database `nodejsclass` exists
- The username and password are correct
- The port is correct, currently `3308`

### Validation error on product price

Send `price` as a number, not as a string:

```json
{
  "name": "Notebook",
  "price": 2.5
}
```

Do not send:

```json
{
  "name": "Notebook",
  "price": "2.5"
}
```

### Route not found

If you request a route that does not exist, the API returns:

```json
{
  "error": "Not found"
}
```

## Suggested Practice Tasks

1. Add a `phone` column to the `users` table.
2. Add validation for the new `phone` field.
3. Add a `description` column to the `products` table.
4. Create a new route file for another resource, such as `categories`.
5. Move the MySQL connection into a separate reusable file.
6. Add npm scripts such as `start` and `dev`.
