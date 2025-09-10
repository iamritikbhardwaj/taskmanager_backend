## ✅ Updated Project Documentation

# 📝 Task and User Management API

A full-featured RESTful API built with **Node.js (v22)**, **Express**, and **MongoDB (via Mongoose)**.

This API allows users to register, log in, and manage tasks. Authentication is handled via **JWT** stored in **HTTP-only cookies**.

---

## 📚 Table of Contents

1. [Project Setup](#project-setup)  
2. [Environment Variables](#environment-variables)  
3. [Installation](#installation)  
4. [Running the Server](#running-the-server)  
5. [API Endpoints](#api-endpoints)  
   - [User Routes](#user-routes)  
   - [Task Routes](#task-routes)  
6. [Authentication](#authentication)  
7. [Testing the API](#testing-the-api)  
8. [Docker](#docker)  
9. [Future Improvements](#future-improvements)  
10. [License & Contact](#license--contact)  

---

## 🛠️ Project Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
````

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory using the example below.

---

## 🔐 Environment Variables

Create a `.env` file and configure the following:

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

| Variable      | Description                          |
| ------------- | ------------------------------------ |
| `PORT`        | Port on which the server will run    |
| `MONGODB_URI` | MongoDB connection URI               |
| `JWT_SECRET`  | Secret key used to sign JWT tokens   |
| `NODE_ENV`    | Set to `development` or `production` |

---

## 📦 Installation

Make sure you have **Node.js v22+** and **npm** installed.

```bash
node -v
# Should print v22.x.x

npm install
```

---

## 🚀 Running the Server

### Start normally:

```bash
npm start
```

### For development (with live reload):

```bash
npm run dev
```

Once running, the API is accessible at:

```bash
http://localhost:8080/
```

---

## 🔌 API Endpoints

### 👤 User Routes

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| GET    | `/api/users`        | Get all users          |
| POST   | `/api/users`        | Register a new user    |
| PUT    | `/api/users/:id`    | Update a user          |
| DELETE | `/api/users/:id`    | Delete a user          |
| POST   | `/api/users/login`  | Log in a user          |
| POST   | `/api/users/logout` | Log out (clear cookie) |

### ✅ Authenticated Routes

Some routes may require login (protected via JWT in cookies).

---

### 📋 Task Routes

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/tasks`     | Get all tasks     |
| POST   | `/api/tasks`     | Create a new task |
| PUT    | `/api/tasks/:id` | Update a task     |
| DELETE | `/api/tasks/:id` | Delete a task     |

> You can add middleware to protect task routes using JWT (recommended).

---

## 🔐 Authentication

### Login Flow

1. User logs in via `POST /api/users/login` with email and password.
2. Server responds with a **JWT token** set as an **HTTP-only cookie**.
3. Authenticated routes should read this cookie and verify the token using middleware.

> Example of route protection middleware (not included by default):

```js
import jwt from 'jsonwebtoken'

const protect = (req, res, next) => {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}
```

---

## 🧪 Testing the API

Use **curl**, **Postman**, or similar API tools.

### Register a User

```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"mypassword"}'
```

### Log In

```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -c cookie.txt \
  -d '{"email":"john@example.com","password":"mypassword"}'
```

---

## 🐳 Docker

If you want to run this app inside Docker:

### 1. Create a `Dockerfile`

```Dockerfile
FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
```

### 2. Build & Run

```bash
docker build -t task-manager-api .
docker run -p 8080:8080 --env-file .env task-manager-api
```

---

## 🌱 Future Improvements

* ✅ Add JWT-based route protection
* ✅ Add middleware for input validation (e.g., Zod, Joi)
* 🔄 Implement refresh token flow
* 🔒 Add role-based access control (RBAC)
* 📃 Add Swagger / OpenAPI documentation
* 🧪 Add unit and integration tests (e.g., with Jest and Supertest)

---

## 🪪 License & Contact

**License**: MIT

**Author**: Ritik Singh
**Email**: [ritiklrt2@gmail.com](mailto:ritiklrt2@gmail.com)

---

> PRs and contributions are welcome. ✨
> If you have suggestions or issues, feel free to reach out or open an issue.