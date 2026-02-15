# FinTrack Pro - Personal Finance Expense Tracker

FinTrack Pro is a full-stack personal finance application designed to help users track their income, expenses, and overall financial health with a modern, high-performance dashboard.

## Features

- **Secure Authentication**: Signup and Login with bcrypt password hashing and JWT-based route protection.
- **Dynamic Dashboard**:
  - Real-time summary cards for Balance, Income, Expenses, and Savings %.
  - Interactive charts (Doughnut & Line) using Chart.js.
  - Responsive layout with Sidebar and Top Navbar.
- **Transaction Management**:
  - CRUD operations for Income and Expenses stored in Firebase Firestore.
  - Advanced transaction table powered by DataTables.js (Search, Sort, Paginate).
  - Export transactions to CSV, Excel, or PDF.
- **UI/UX**:
  - Modern Gradient cards and glassmorphism aesthetic.
  - Smooth hover animations and transitions.
  - Dark Mode support with persistence.
  - Fully responsive design.

## Tech Stack

- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: Firebase Firestore
- **Authentication**: JWT, bcrypt
- **Libraries**: Chart.js, DataTables.js, jQuery (for DataTables)

## Setup Instructions

1. **Clone the project**:
   ```bash
   cd FinTrackPro
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Firebase Configuration**:
   - Place your `serviceAccountKey.json` in the root directory.
   - Alternatively, configure environment variables in `.env`.

4. **Environment Variables**:
   - Create a `.env` file based on `.env.example`.
   - Set `JWT_SECRET` and Firebase credentials.

5. **Start the Server**:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`.

## API Routes

### Auth
- `POST /api/auth/signup`: Create a new user.
- `POST /api/auth/login`: Login and receive JWT.

### Expenses
- `GET /api/expenses`: Get all user expenses (Auth required).
- `POST /api/expenses`: Add an expense.
- `PUT /api/expenses/:id`: Update an expense.
- `DELETE /api/expenses/:id`: Delete an expense.

### Income
- `GET /api/income`: Get all user income (Auth required).
- `POST /api/income`: Add income.
- `PUT /api/income/:id`: Update income.
- `DELETE /api/income/:id`: Delete income.

## Firestore Schema

### `users` collection
- `doc(email)`: { email, password (hashed), displayName, createdAt }

### `expenses` collection
- `userId` (string)
- `amount` (number)
- `category` (string)
- `description` (string)
- `date` (timestamp/string)

### `income` collection
- `userId` (string)
- `amount` (number)
- `source` (string)
- `date` (timestamp/string)
