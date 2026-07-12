const LedgerModel = require("../models/Ledger.models");

// fetch ledger for a given account
async function getLedgerByAccount(req, res) {
    try {

        const { accountId } = req.params;

        const ledger = await LedgerModel.find({ accountId });

        res.status(200).json({
            message: "Ledger fetched successfully",
            ledger
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch ledger",
            error: error.message
        });

    }
}

// calculate account balance (supports point-in-time)
async function getAccountBalance(req, res) {
    try {
        const { accountId } = req.params;
        const { date } = req.query; // point-in-time query

        // default filter
        const filter = { accountId };

        // filter entries up to the provided date
        if (date) {
            filter.timestamp = { $lte: new Date(date) };
        }

        const ledger = await LedgerModel.find(filter);

        let balance = 0;

        ledger.forEach((entry) => {
            if (entry.entryType === "Credit") {
                balance += entry.amount;
            } else if (entry.entryType === "Debit") {
                balance -= entry.amount;
            }
        });

        res.status(200).json({
            accountId,
            balance,
            asOf: date ? new Date(date) : new Date() // include the calculated timestamp
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to calculate balance",
            error: error.message
        });
    }
}

// get full audit trail
async function getAuditTrail(req, res) {
    try {

        const { accountId } = req.params;

        const auditTrail = await LedgerModel.find({ accountId }).sort({
            timestamp: 1
        });

        res.status(200).json({
            message: "Audit trail fetched successfully",
            auditTrail
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch audit trail",
            error: error.message
        });

    }
}

module.exports = {
    getLedgerByAccount,
    getAccountBalance,
    getAuditTrail
};