# FinTrackPro

## Project Overview
FinTrackPro is a comprehensive financial tracking application that allows users to manage their finances effectively. The application provides tools to track expenses, incomes, and generate financial reports.

## Features
- Expense Tracking
- Income Tracking
- Financial Reporting
- User Authentication

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)

## Installation Guide
1. Clone the repository:
   ```bash
   git clone https://github.com/UshaSudulaguntla-11/FinTrackPro.git
   ```
2. Navigate into the project directory:
   ```bash
   cd FinTrackPro
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables as required.
5. Start the application:
   ```bash
   npm start
   ```

## API Endpoints
- **GET** /api/expenses - Retrieve all expenses
- **POST** /api/expenses - Create a new expense
- **GET** /api/incomes - Retrieve all incomes
- **POST** /api/incomes - Create a new income

## Database Schema
- **Users**:
  - id
  - username
  - password

- **Expenses**:
  - id
  - userId
  - amount
  - date
  - description

- **Incomes**:
  - id
  - userId
  - amount
  - date
  - source

## Security Features
- Password hashing using bcrypt
- Secure JWT authentication
- Input validation to prevent SQL injection and XSS attacks

## Usage Guide
- User registration is required to access the features.
- Once registered, users can log in and begin tracking their finances.

## Contributing Guidelines
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Write your code and include tests where applicable.
4. Submit a pull request detailing your changes.

## Roadmap
- [ ] Implement user roles and permissions
- [ ] Enhance reporting features
- [ ] Mobile application support