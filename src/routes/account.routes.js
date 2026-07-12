const express=require("express")
const router=express.Router();
const accountControllers=require("../controllers/account.controllers")

//APIS

/**
 * @swagger
 * /api/accounts:
 *   post:
 *     summary: Create a new bank account
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountNumber:
 *                 type: string
 *               accountHolderName:
 *                 type: string
 *               accountType:
 *                 type: string
 *               initialBalance:
 *                 type: number
 *     responses:
 *       201:
 *         description: Account successfully created
 */
router.post("/",accountControllers.createAccount);

/**
 * @swagger
 * /api/accounts:
 *   get:
 *     summary: Retrieve a list of all accounts
 *     tags: [Accounts]
 *     responses:
 *       200:
 *         description: A list of accounts.
 */
router.get("/",accountControllers.getAllAccounts);

/**
 * @swagger
 * /api/accounts/{id}:
 *   get:
 *     summary: Get an account by its ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The account ID
 *     responses:
 *       200:
 *         description: Account fetched successfully
 *       404:
 *         description: Account not found
 */
router.get("/:id",accountControllers.getAccountById);

module.exports=router;