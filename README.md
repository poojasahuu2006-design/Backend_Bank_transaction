# 🏦 Banking Transaction Ledger (Backend)

A production-ready banking transaction backend built with Node.js, Express, and MongoDB. This project implements a **double-entry ledger architecture** with highly secure, ACID-compliant MongoDB transactions to ensure absolute data integrity during deposits, withdrawals, and transfers.

## 🚀 Features
- **ACID Transactions:** Ensures absolute atomicity. If a transfer fails midway, all changes are rolled back automatically using MongoDB Sessions.
- **Double-Entry Ledger:** Calculates real-time user balances dynamically based on immutable ledger records rather than storing a vulnerable static balance field.
- **Idempotency & Concurrency:** Protected against race conditions.
- **RESTful API:** Clean, structured endpoints for account management and transaction history.
- **Pagination & Filtering:** Advanced querying capabilities for fetching transaction histories (sort, filter by amount, pagination).

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas & Mongoose
- **Architecture:** MVC (Model-View-Controller)

## 📦 Local Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Backend_Project3
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add your MongoDB URI:
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/account
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   # OR
   npm start
   ```

## 🌐 API Endpoints Overview

### Accounts
- `POST /api/accounts` - Create a new account (with optional initial balance).
- `GET /api/accounts` - Get all accounts.
- `GET /api/accounts/:id` - Get a specific account.

### Transactions
- `POST /api/transactions/deposit` - Deposit money into an account.
- `POST /api/transactions/withdraw` - Withdraw money from an account.
- `POST /api/transactions/` - Transfer money between two accounts.
- `GET /api/transactions` - Fetch all transactions (Supports pagination, status, amount filters).

### Ledger & Audit
- `GET /api/ledge/balance/:accountId` - Calculate the live dynamic balance of an account.
- `GET /api/ledge/audit/:accountId` - Retrieve the entire transaction audit trail for a specific account.
