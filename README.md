Storefront Backend API

This is a backend API for a storefront application built with Node.js, Express, PostgreSQL, and TypeScript. It provides endpoints to manage users, products, and orders.
Prerequisites

Before running the project, ensure you have the following installed:

    Node.js (v14.x or higher)
    PostgreSQL (v13 or higher)
    NPM (comes with Node.js)

Setup Instructions
1. Clone the Repository

First, clone the repository to your local machine:

bash
git clone 
cd storefront

2. Install Dependencies

Install all necessary dependencies using npm:
bash
npm install

3. Set Up Environment Variables
Create a .env file in the root of the project with the following content:

env:
HOST=localhost
DB_NAME=storefront
USER=your_postgres_user
PASSWORD=your_postgres_password
JWT_SECRET=your_jwt_secret
SALT_ROUNDS=10
PORT=5000

Replace your_postgres_user and your_postgres_password with your PostgreSQL username and password.

4. Database Setup

Make sure you have PostgreSQL installed and running.
Create the PostgreSQL database by running the following in your terminal:

bash
psql -U postgres
Once inside PostgreSQL, create the database:

sql

CREATE DATABASE storefront;

5. Database Migrations

To migrate the database schema, you can use the db-migrate tool. First, make sure you have it installed globally:

bash

npm install -g db-migrate

Then run the following command to migrate your database:

bash

db-migrate up

6. Running the Server

You can run the server in development mode using Nodemon:

bash
npm run start
The server will start on port 5000 by default. You can check or update the port in the .env file by changing the PORT value.
Backend API Ports

 Backend: The server runs on port 5000 (you can modify this in .env under PORT).
Database: The PostgreSQL database runs on the default port 5432 unless changed.

7. Running Tests

To run the test suite, use the following command:


npm test

This runs the Jasmine tests, which are located in the src/tests folder.
Available Scripts

Here are the available scripts defined in the package.json:

    npm run build: Lints, formats, and builds the TypeScript files.
    npm run start: Starts the server using Nodemon and ts-node.
    npm run lint: Runs ESLint to lint the TypeScript files.
    npm run format: Formats the code using Prettier.
    npm run test: Runs the Jasmine test suite.

Project Structure

plaintext

src/
├── controllers/
├── database/
├── middleware/
├── models/
├── routes/
├── tests/
└── index.ts

8. Connecting to the Database

In the src/database folder, you have a pool.ts file where PostgreSQL is configured using the pg package. This setup is based on environment variables:

typescript

const { HOST, DB_NAME, USER, PASSWORD } = process.env;

const pool = new Pool({
  host: HOST,
  database: DB_NAME,
  user: USER,
  password: PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;

