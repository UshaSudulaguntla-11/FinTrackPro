# 💰 FinTrackPro

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-16.x-green)](https://nodejs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-yellow)](https://firebase.google.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-brightgreen)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 📑 Table of Contents

* [Project Overview](#-project-overview)
* [Key Features](#-key-features)
* [Tech Stack](#-tech-stack)
* [Project Structure](#-project-structure)
* [Installation & Setup](#-installation--setup)
* [API Endpoints](#-api-endpoints)
* [Database Structure](#-database-structure)
* [Security Features](#-security-features)



---

## 🚀 Project Overview

**FinTrackPro** is a full-stack **personal finance web application** designed to help users:

* Track income and expenses
* Visualize financial data through interactive charts
* Export reports for analysis

**Why it matters:**
Financial literacy is essential. FinTrackPro empowers users to monitor spending, understand savings, and make informed financial decisions.

---

## ✨ Key Features

### 🔐 Secure Authentication

* Signup/Login with **hashed passwords**
* **JWT-based route protection**
* Session & token management

### 📊 Interactive Dashboard

* Real-time balance, income, and expenses overview
* Savings insights
* Charts & graphs using **Chart.js**
* Mobile-friendly & responsive design

### 💳 Transaction Management

* Add, edit, delete **Income & Expenses**
* Categorized transactions (Food, Rent, Utilities, etc.)
* Searchable, sortable, and paginated tables (**DataTables.js**)

### 📁 Export Functionality

* Export transactions as **CSV**, **Excel**, or **PDF**

### 🎨 UI / UX

* Modern, clean interface
* Dark mode support
* Intuitive sidebar navigation

---

## 🛠 Tech Stack

| Layer          | Technology                                             |
| -------------- | ------------------------------------------------------ |
| Frontend       | HTML5, CSS3, JavaScript (ES6), Chart.js, DataTables.js |
| Backend        | Node.js, Express.js                                    |
| Database       | Firebase Firestore                                     |
| Authentication | JWT, bcrypt                                            |

---

## 📂 Project Structure

```
FinTrackPro/
├── public/             # CSS, JS, Images
├── routes/             # API routes (auth, income, expenses)
├── controllers/        # Business logic
├── middleware/         # JWT authentication
├── config/             # Firebase configuration
├── server.js           # Main server file
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/UshaSudulaguntla-11/FinTrackPro.git
cd FinTrackPro
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
JWT_SECRET=your_jwt_secret

FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...
```

### 4️⃣ Start the Server

```bash
npm start
```

Visit: `http://localhost:3000`

---

## 🔌 API Endpoints

### Auth Routes

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | /api/auth/signup | Register new user |
| POST   | /api/auth/login  | Login & get JWT   |

### Expense Routes

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| GET    | /api/expenses     | List all expenses |
| POST   | /api/expenses     | Add expense       |
| PUT    | /api/expenses/:id | Update expense    |
| DELETE | /api/expenses/:id | Delete expense    |

### Income Routes

| Method | Endpoint        | Description     |
| ------ | --------------- | --------------- |
| GET    | /api/income     | List all income |
| POST   | /api/income     | Add income      |
| PUT    | /api/income/:id | Update income   |
| DELETE | /api/income/:id | Delete income   |

---

## 🗄️ Database Structure (Firestore)

### Users Collection

```json
{
  "email": "user@example.com",
  "password": "hashed_password",
  "createdAt": "timestamp"
}
```

### Expenses Collection

```json
{
  "userId": "user_id",
  "amount": 500,
  "category": "Food",
  "description": "Lunch",
  "date": "2026-02-15"
}
```

### Income Collection

```json
{
  "userId": "user_id",
  "amount": 20000,
  "source": "Salary",
  "date": "2026-02-01"
}
```

---

## 🔒 Security Features

* Password hashing using **bcrypt**
* JWT-based authentication
* Environment variable protection
* Firestore access rules



