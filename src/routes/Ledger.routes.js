const express=require("express")
const ledgerControllers=require("../controllers/Ledger.controllers")
const ledge=express.Router();


/**
 * @swagger
 * /api/ledge/{accountId}:
 *   get:
 *     summary: Get ledger entries by account ID
 *     tags: [Ledger]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ledger entries
 */
ledge.get("/:accountId",ledgerControllers.getLedgerByAccount);

/**
 * @swagger
 * /api/ledge/balance/{accountId}:
 *   get:
 *     summary: Get live balance calculation for an account
 *     tags: [Ledger]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         required: false
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Optional point-in-time query (e.g. 2023-10-25T14:30:00Z)
 *     responses:
 *       200:
 *         description: Account balance
 */
ledge.get("/balance/:accountId",ledgerControllers.getAccountBalance);

/**
 * @swagger
 * /api/ledge/audit/{accountId}:
 *   get:
 *     summary: Get full audit trail of transactions for an account
 *     tags: [Ledger]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Audit trail
 */
ledge.get("/audit/:accountId", ledgerControllers.getAuditTrail);

module.exports =ledge;