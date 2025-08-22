# Invoice Generator


> ⚠️ **Warning:** THe puppeteer has not been been configured to production yet , so it can't geenerate INVOICES on deployed URL , set up the project locally as instructed below,  if you wanna experience all the  functionalities of this prototype.

This is a full-stack invoice generator application built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to create, manage, and download invoices as PDFs.

## Features

- User authentication (signup and login)
- Create and manage products
- Generate invoices with multiple products
- Download invoices as PDFs

## Tech Stack

**Client:**

- React
- Redux Toolkit
- React Router
- Vite

**Server:**

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Puppeteer

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Gagan2004/Invoice-generator.git
cd invoice-generator
```

### 2. Set Up the Server

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add the following environment variables:

```env
PORT=5000
MONGO_URI=mongodb+srv://test_user:test_user@voice.j5zddud.mongodb.net/?retryWrites=true&w=majority&appName=voice
JWT_SECRET=abc123
```

### 3. Set Up the Client

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory and add the following environment variable:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Running the Application

### 1. Start the Server

```bash
cd server
npm run dev
```

The server will be running on `http://localhost:5000`.

### 2. Start the Client

```bash
cd client
npm run dev
```

The client will be running on `http://localhost:5173`. Open your browser and navigate to this address to use the application.
