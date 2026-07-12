const mongoose = require("mongoose");
const TransactionModel = require("../models/Transaction.models");
const AccountModel = require("../models/account.models");
const LedgerModel = require("../models/Ledger.models");

async function transferMoney(req, res) {

    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        const {
            fromAccount,
            toAccount,
            amount,
            description
        } = req.body;

        // validate fields
        if (!fromAccount || !toAccount || !amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "All required fields must be provided"
            });
        }

        if (fromAccount === toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Sender and Receiver account cannot be the same"
            });
        }

        if (amount <= 0) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Amount must be greater than zero"
            });
        }

        // find accounts
        const sender = await AccountModel.findById(fromAccount).session(session);
        const receiver = await AccountModel.findById(toAccount).session(session);

        if (!sender || !receiver) {
            await session.abortTransaction();
            return res.status(404).json({
                message: "Sender or Receiver account not found"
            });
        }

        // get sender ledger
        const senderLedger = await LedgerModel.find({
            accountId: fromAccount
        }).session(session);

        // calculate sender balance
        let balance = 0;

        for (const entry of senderLedger) {

            if (entry.entryType === "Credit") {
                balance += entry.amount;
            } else if (entry.entryType === "Debit") {
                balance -= entry.amount;
            }

        }

        // check if enough balance
        if (balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        // record transaction
        const transactionData = await TransactionModel.create(
            [{
                fromAccount,
                toAccount,
                amount,
                description,
                status: "Completed"
            }],
            { session }
        );

        const transaction = transactionData[0];

        // debit sender
        await LedgerModel.create(
            [{
                accountId: fromAccount,
                transactionId: transaction._id,
                entryType: "Debit",
                amount,
                description
            }],
            { session }
        );

        // credit receiver
        await LedgerModel.create(
            [{
                accountId: toAccount,
                transactionId: transaction._id,
                entryType: "Credit",
                amount,
                description
            }],
            { session }
        );

        // commit
        await session.commitTransaction();

        res.status(201).json({
            message: "Money transferred successfully",
            transaction
        });

    } catch (error) {

        // rollback if anything fails
        await session.abortTransaction();

        res.status(500).json({
            message: "Transaction failed",
            error: error.message
        });

    } finally {

        // clean up session
        await session.endSession();

    }

}

async function depositMoney(req, res) {

    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        const {
            accountId,
            amount,
            description
        } = req.body;

        // validate inputs
        if (!accountId || !amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Account Id and Amount are required"
            });
        }

        if (amount <= 0) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Amount must be greater than zero"
            });
        }

        // check if account exists
        const account = await AccountModel.findById(accountId).session(session);

        if (!account) {
            await session.abortTransaction();
            return res.status(404).json({
                message: "Account not found"
            });
        }

        // add transaction
        const transactionData = await TransactionModel.create(
            [{
                fromAccount: null,
                toAccount: accountId,
                amount,
                description,
                status: "Completed"
            }],
            { session }
        );

        const transaction = transactionData[0];

        // credit the account
        await LedgerModel.create(
            [{
                accountId,
                transactionId: transaction._id,
                entryType: "Credit",
                amount,
                description
            }],
            { session }
        );

        await session.commitTransaction();

        res.status(201).json({
            message: "Amount deposited successfully",
            transaction
        });

    } catch (error) {

        await session.abortTransaction();

        res.status(500).json({
            message: "Deposit failed",
            error: error.message
        });

    } finally {

        await session.endSession();

    }

}


async function withdrawMoney(req, res) {

    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        const {
            accountId,
            amount,
            description
        } = req.body;

        // validate fields

        if (!accountId || !amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "All required fields must be provided"
            });
        }

        if (amount <= 0) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Amount must be greater than zero"
            });
        }

        // find account

        const account = await AccountModel.findById(accountId).session(session);

        if (!account) {
            await session.abortTransaction();
            return res.status(404).json({
                message: "Account not found"
            });
        }

        // get ledger

        const ledger = await LedgerModel.find({
            accountId
        }).session(session);

        // calculate current balance

        let balance = 0;

        for (const entry of ledger) {

            if (entry.entryType === "Credit") {
                balance += entry.amount;
            }

            else if (entry.entryType === "Debit") {
                balance -= entry.amount;
            }

        }

        // check if balance is enough

        if (balance < amount) {

            await session.abortTransaction();

            return res.status(400).json({
                message: "Insufficient Balance"
            });

        }

        // log transaction

        const transactionData = await TransactionModel.create(
            [{
                fromAccount: accountId,
                toAccount: null,
                amount,
                description,
                status: "Completed"
            }],
            { session }
        );

        const transaction = transactionData[0];

        // debit the account

        await LedgerModel.create(
            [{
                accountId,
                transactionId: transaction._id,
                entryType: "Debit",
                amount,
                description
            }],
            { session }
        );

        // apply changes

        await session.commitTransaction();

        res.status(201).json({
            message: "Money withdrawn successfully",
            transaction
        });

    }

    catch (error) {

        await session.abortTransaction();

        res.status(500).json({
            message: "Withdraw failed",
            error: error.message
        });

    }

    finally {

        await session.endSession();

    }

}

async function getAllTransactions(req, res) {

    try {

        const {
            page = 1,
            limit = 10,
            status,
            search,
            minAmount,
            maxAmount,
            sort
        } = req.query;

        const filter = {};

        if (status) {
            filter.status = status;
        }

        if (minAmount || maxAmount) {

            filter.amount = {};

            if (minAmount) {
                filter.amount.$gte = Number(minAmount);
            }

            if (maxAmount) {
                filter.amount.$lte = Number(maxAmount);
            }

        }

        if (search) {

            filter.description = {
                $regex: search,
                $options: "i"
            };

        }

        let sortOption = {};

        if (sort === "asc") {
            sortOption.createdAt = 1;
        } else {
            sortOption.createdAt = -1;
        }

        const skip = (page - 1) * limit;

        const transactions = await TransactionModel.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit));

        const totalTransactions = await TransactionModel.countDocuments(filter);

        res.status(200).json({
            message: "Transactions fetched successfully",
            totalTransactions,
            currentPage: Number(page),
            totalPages: Math.ceil(totalTransactions / limit),
            transactions
        });

    } catch (error) {

        res.status(500).json({
            message: "Transactions not found",
            error: error.message
        });

    }

}

async function getTransactionById(req, res) {

    try {

        const { id } = req.params;

        const transaction = await TransactionModel.findById(id);

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        res.status(200).json({
            message: "Transaction fetched successfully",
            transaction
        });

    } catch (error) {

        res.status(500).json({
            message: "Transaction not found",
            error: error.message
        });

    }

}

module.exports = {
    transferMoney,
    getAllTransactions,
    getTransactionById,
    depositMoney,
    withdrawMoney
};