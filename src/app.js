const express=require("express")
const app=express();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const router=require("./routes/account.routes")
const transaction=require("./routes/Transaction.routes")
const ledge=require("./routes/Ledger.routes");
const errorHandler = require("./middleware/handler.middleware");

// swagger config
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
                url: 'http://localhost:3000',
                description: 'Local Development Server'
            }
        ]
    },
    apis: ['./src/routes/*.js'], // path to route files for docs
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(express.json());

// serve swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/accounts",router);
app.use("/api/transactions",transaction);
app.use("/api/ledge",ledge);

// global error handler should be last
app.use(errorHandler);

module.exports=app;
