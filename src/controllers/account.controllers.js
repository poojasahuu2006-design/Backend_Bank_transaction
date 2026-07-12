const accountModel = require("../models/account.models");
const LedgerModel = require("../models/Ledger.models");
const mongoose = require("mongoose");

async function createAccount(req, res) {
    const {
        accountNumber,
        accountHolderName,
        accountType,
        currency,
        status,
        initialBalance
    } = req.body;

    const user = await accountModel.create({
        accountNumber,
        accountHolderName,
        accountType,
        currency,
        status
    });

    // add initial deposit entry if balance > 0
    if (initialBalance && initialBalance > 0) {
        await LedgerModel.create({
            transactionId: new mongoose.Types.ObjectId(), // using a dummy transaction ID for the deposit
            accountId: user._id,
            entryType: "Credit",
            amount: initialBalance,
            description: "Initial Deposit"
        });
    }

    res.status(201).json({
        message: "Account created successfully",
        account: user
    });
}

async function getAllAccounts(req, res) {
    const accounts = await accountModel.find();
    res.status(200).json({
        message: "Account fetched successfully",
        accounts
    });
}

async function getAccountById(req, res) {
    const { id } = req.params;
    const account = await accountModel.findById(id);
    
    if (!account) {
        const error = new Error("Account not found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({
        message: "Account fetched successfully",
        account
    });
}

module.exports = {
    createAccount,
    getAllAccounts,
    getAccountById
};