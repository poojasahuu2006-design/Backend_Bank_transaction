const express = require("express");
const cors = require("cors");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const router = require("./routes/account.routes");
const transaction = require("./routes/Transaction.routes");
const ledge = require("./routes/Ledger.routes");
const errorHandler = require("./middleware/handler.middleware");

// Enable CORS for all origins
app.use(cors());

// Swagger config (using relative URL '/' so it works seamlessly on Localhost AND Render!)
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Banking Transaction Ledger API',
            version: '1.0.0',
            description: 'API documentation for the Banking Transaction Ledger backend',
        },
        servers: [
            {
                url: '/',
                description: 'Current Server (Local or Production)'
            }
        ]
    },
    apis: ['./src/routes/*.js'], // path to route files for docs
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(express.json());

// Health check endpoint for Render
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Root friendly welcome endpoint
app.get("/", (req, res) => {
    res.status(200).json({
        name: "Banking Transaction Ledger API",
        version: "1.0.0",
        docs: "/api-docs",
        health: "/health"
    });
});

// Serve swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
    customSiteTitle: "Banking Transaction Ledger API Docs"
}));

app.use("/api/accounts", router);
app.use("/api/transactions", transaction);
app.use("/api/ledge", ledge);

// Global error handler should be last
app.use(errorHandler);

module.exports = app;
