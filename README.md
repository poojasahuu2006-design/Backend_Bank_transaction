# 🏦 Banking Transaction Ledger (Backend)

[![Live Demo](https://img.shields.io/badge/Live_Demo-Render_Cloud-brightgreen?style=for-the-badge&logo=render)](https://backend-bank-transaction-1.onrender.com/api-docs)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/poojasahuu2006-design/Backend_Bank_transaction)
[![Swagger UI](https://img.shields.io/badge/API%20Docs-OpenAPI_3.0-85EA2D?style=for-the-badge&logo=swagger)](https://backend-bank-transaction-1.onrender.com/api-docs)
[![Node.js](https://img.shields.io/badge/Backend-Node.js_20-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![MongoDB Atlas](https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)
[![Docker](https://img.shields.io/badge/Container-Docker-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)

A production-ready, event-sourced banking ledger backend built with **Node.js**, **Express.js**, and **MongoDB Atlas**. This project implements a **double-entry ledger architecture** with strict **ACID-compliant MongoDB transaction sessions** to ensure absolute data integrity during deposits, withdrawals, and inter-account transfers.

---

## 🚀 Live Demo & Interactive Testing

Experience the live API in your browser using interactive Swagger documentation:

[![Try Live Demo](https://img.shields.io/badge/🔗_Launch_Live_Demo-Swagger_UI-00C853?style=for-the-badge&logo=swagger&logoColor=white)](https://backend-bank-transaction-1.onrender.com/api-docs)

| Resource | URL | Status |
|---|---|---|
| 🌐 **Live Demo (Interactive Swagger UI)** | [https://backend-bank-transaction-1.onrender.com/api-docs](https://backend-bank-transaction-1.onrender.com/api-docs) | ![Online](https://img.shields.io/badge/Status-Online-brightgreen) |
| 🚀 **API Base URL** | [https://backend-bank-transaction-1.onrender.com](https://backend-bank-transaction-1.onrender.com) | ![Online](https://img.shields.io/badge/Status-Online-brightgreen) |
| 🩺 **Health Check** | [https://backend-bank-transaction-1.onrender.com/health](https://backend-bank-transaction-1.onrender.com/health) | ![Healthy](https://img.shields.io/badge/Health-200_OK-brightgreen) |

---

## 🧪 How to Test in the Live Demo (30 Seconds Walkthrough)

You can test the entire banking system directly without installing anything:

1. **Open the Live Demo**: Click [**Launch Live Demo**](https://backend-bank-transaction-1.onrender.com/api-docs).
2. **Create Account**:
   - Scroll to **Accounts** → `POST /api/accounts` → Click **Try it out** → **Execute**.
   - Copy the generated `_id` or `accountNumber`.
3. **Deposit Funds**:
   - Scroll to **Transactions** → `POST /api/transactions/deposit` → Input your `accountId` and `amount: 5000` → **Execute**.
4. **Transfer Funds**:
   - Scroll to **Transactions** → `POST /api/transactions` → Transfer funds between two accounts inside an atomic ACID session.
5. **Inspect Live Ledger Balance**:
   - Scroll to **Ledger** → `GET /api/ledge/balance/{accountId}` → Verify real-time balance computed dynamically from immutable records!

---

## ✨ Key Architectural Highlights

- **ACID Transactions (Atomicity & Consistency):** Money transfers execute inside isolated MongoDB transaction sessions. If an operation fails midway (e.g., recipient account not found or network drop), all updates are automatically rolled back.
- **Double-Entry Ledger:** Balances are **not stored as static editable numbers**. Instead, real-time balances are computed dynamically from immutable credit/debit ledger entries, eliminating race conditions and balance tampering.
- **Auditing & Traceability:** Every transfer produces matching paired ledger records that can be audited for any account at any point in time.
- **Interactive Swagger Documentation:** Built-in OpenAPI 3.0 UI allowing live endpoint testing directly from the browser.
- **Containerized:** Dockerized using `node:20-alpine` for automated deployment on Render, AWS, or GCP.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js (v20+)
- **Framework:** Express.js
- **Database:** MongoDB Atlas via Mongoose
- **API Documentation:** Swagger UI & swagger-jsdoc (OpenAPI 3.0)
- **Containerization & Hosting:** Docker, Render Cloud

---

## 📡 API Endpoints Overview

### 1. Accounts (`/api/accounts`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/accounts` | Create a new bank account with initial balance |
| `GET` | `/api/accounts` | Retrieve list of all accounts |
| `GET` | `/api/accounts/:id` | Get account details by Account ID |

### 2. Transactions (`/api/transactions`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/transactions/deposit` | Deposit funds into an account (writes credit ledger entry) |
| `POST` | `/api/transactions/withdraw` | Withdraw funds from an account (validates ledger balance) |
| `POST` | `/api/transactions` | Atomic transfer between two accounts with ACID session |
| `GET` | `/api/transactions` | Query transaction history (supports pagination, filtering) |
| `GET` | `/api/transactions/:id` | Fetch specific transaction details by ID |

### 3. Ledger & Audits (`/api/ledge`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/ledge/balance/:accountId` | Compute live balance from ledger entries |
| `GET` | `/api/ledge/audit/:accountId` | Full audit trail of transactions and ledger records |
| `GET` | `/api/ledge/:accountId` | Get all raw ledger entries for an account |

---

## 💻 Local Setup & Installation

### Prerequisites
- Node.js (v20 or higher)
- MongoDB Atlas connection string (or local MongoDB)

### 1. Clone the repository
```bash
git clone https://github.com/poojasahuu2006-design/Backend_Bank_transaction.git
cd Backend_Bank_transaction
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/account?retryWrites=true&w=majority
```

### 4. Start the Application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

Visit `http://localhost:3000/api-docs` to access the interactive Swagger documentation.

---

## 🐳 Docker Deployment

To build and run via Docker:
```bash
docker build -t banking-ledger .
docker run -p 3000:3000 -e MONGO_URI="your-mongodb-uri" banking-ledger
```

---

## 👤 Author

- **Pooja Sahu** — [GitHub Profile](https://github.com/poojasahuu2006-design)
