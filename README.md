💰 FinTrackPro








🚀 Project Overview

FinTrackPro is a full-stack personal finance web application that helps users manage income, expenses, and savings efficiently. It combines secure authentication, real-time analytics, interactive dashboards, and exportable reports into a seamless user experience.

Why it matters:
Financial literacy is key to personal growth. This app empowers users to track spending habits, visualize financial health, and make informed decisions.

✨ Key Features
🔐 Secure Authentication

Signup/Login with hashed passwords

JWT-based route protection

Session & token management for security

📊 Interactive Dashboard

Real-time balance, income, and expenses

Savings calculation & insights

Charts & graphs using Chart.js

Mobile-friendly & responsive layout

💳 Transaction Management

Add, update, delete Income & Expenses

Categorization (Food, Rent, Utilities, etc.)

Searchable, sortable, and paginated tables (DataTables.js)

📁 Export Functionality

Export transactions to CSV, Excel, PDF

Easy for reports and bookkeeping

🎨 UI / UX

Clean, modern design

Dark mode support

Intuitive navigation

🛠 Tech Stack
Layer	Tech
Frontend	HTML5, CSS3, JavaScript (ES6), Chart.js, DataTables.js
Backend	Node.js, Express.js
Database	Firebase Firestore
Authentication	JWT, bcrypt


📂 Project Structure
FinTrackPro/
├── public/             # CSS, JS, Images
├── routes/             # API endpoints (auth, income, expenses)
├── controllers/        # Business logic
├── middleware/         # JWT authentication
├── config/             # Firebase configuration
├── server.js           # Entry point
├── package.json
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repo
git clone https://github.com/UshaSudulaguntla-11/FinTrackPro.git
cd FinTrackPro

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables

Create .env file:

PORT=3000
JWT_SECRET=your_jwt_secret

FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...

4️⃣ Start Server
npm start


Visit: http://localhost:3000

🔌 API Endpoints

Auth
Method	Endpoint	Description
POST	/api/auth/signup	Register new user
POST	/api/auth/login	Login & get JWT

Expenses
Method	Endpoint	Description
GET	/api/expenses	List all expenses
POST	/api/expenses	Add expense
PUT	/api/expenses/:id	Update expense
DELETE	/api/expenses/:id	Delete expense

Income
Method	Endpoint	Description
GET	/api/income	List all income
POST	/api/income	Add income
PUT	/api/income/:id	Update income
DELETE	/api/income/:id	Delete income


🗄️ Database Structure (Firestore)
Users Collection
{
  "email": "user@example.com",
  "password": "hashed_password",
  "createdAt": "timestamp"
}

Expenses Collection
{
  "userId": "user_id",
  "amount": 500,
  "category": "Food",
  "description": "Lunch",
  "date": "2026-02-15"
}

Income Collection
{
  "userId": "user_id",
  "amount": 20000,
  "source": "Salary",
  "date": "2026-02-01"
}

🔒 Security Features

Password hashing using bcrypt

JWT-based authentication

Environment variable protection

Firestore rules for secure access

