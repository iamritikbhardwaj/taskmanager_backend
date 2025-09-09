# Project Documentation

# Task and User Management API

This project is a simple RESTful API built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.  
It provides user authentication and task management functionalities.

---

## Table of Contents

1. [Project Setup](#project-setup)  
2. [Environment Variables](#environment-variables)  
3. [Installation](#installation)  
4. [Running the Server](#running-the-server)  
5. [API Endpoints](#api-endpoints)  
   - [User Routes](#user-routes)  
   - [Task Routes](#task-routes)  
6. [Authentication](#authentication)  
7. [Testing the API](#testing-the-api)  
8. [Future Improvements](#future-improvements)  

---

## Project Setup

1. Clone the repository:

```bash
   git clone <your-repo-url>
   cd <project-folder>
```

2. Install dependencies:

```bash
   npm install
```

3. Create a `.env` file in the root directory with necessary environment variables (see next section).

---

## Environment Variables

Create a `.env` file and add the following:

```bash
PORT=8080
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
NODE_ENV=development
```

* `PORT`: Port on which the server runs (default: 8080).
* `MONGODB_URI`: Your MongoDB connection string.
* `JWT_SECRET`: Secret key for signing JSON Web Tokens.
* `NODE_ENV`: Environment mode (`development` or `production`).

---

## Installation

1. Make sure you have **Node.js** and **npm** installed.
2. Run `npm install` to install project dependencies.

---

## Running the Server

Run the server using:

```bash
npm start
```

or if you use **nodemon** for development:

```bash
npm run dev
```

The API will be available at:

```bash
http://localhost:8080/
```

---

## API Endpoints

### User Routes

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| GET    | `/api/users`       | Get all users       |
| POST   | `/api/users`       | Create a new user   |
| PUT    | `/api/users/:id`   | Update a user by ID |
| DELETE | `/api/users/:id`   | Delete a user by ID |
| POST   | `/api/users/login` | Log in a user       |

### Task Routes

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/api/tasks`     | Get all tasks       |
| POST   | `/api/tasks`     | Create a new task   |
| PUT    | `/api/tasks/:id` | Update a task by ID |
| DELETE | `/api/tasks/:id` | Delete a task by ID |

---

## Authentication

* Users can log in using `/api/users/login` endpoint.
* On successful login, a JWT token is set in an HTTP-only cookie for authentication.
* Protect your routes by verifying JWT tokens (not included by default, can be added).

---

## Testing the API

Use **curl**, **Postman**, or any API client to test the endpoints.

Example curl command to create a user:

```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"mypassword"}'
```

Example curl command to login:

```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -c cookie.txt \
  -d '{"email":"john@example.com","password":"mypassword"}'
```

---

## Future Improvements

* Add **route protection** middleware to secure sensitive endpoints.
* Add **input validation** using libraries like **Zod** or **Joi**.
* Implement **refresh tokens** for better session management.
* Add **role-based access control** (admin/user).
* Add **Swagger/OpenAPI** documentation for better API docs.

---

## License

MIT License.

---

## Contact

For questions or contributions, please contact:
Ritik Singh - [ritiklrt2@gmail.com](mailto:ritiklrt2@gmail.com)