const db = require('../models');
const crypto = require('crypto');


const createAccount = (req, res) => {
    // Check mandatory request parameters
    if (!req.body.user) {
        return res.status(400).json({ error: 'user : Missing parameters' });
    }

    // Check if account already exists
    if (db[req.body.user]) {
        return res.status(409).json({ error: 'User already exists' });
    }

    // Convert balance to number if needed
    let balance = req.body.balance;
    if (balance && typeof balance !== 'number') {
        balance = parseFloat(balance);
        if (isNaN(balance)) {
            return res.status(400).json({ error: 'Balance must be a number' });
        }
    }

    // Create account
    const account = {
        user: req.body.user,
        description: req.body.description || `${req.body.user}'s budget`,
        balance: balance || 0,
        transactions: [],
    };
    db[req.body.user] = account;
    console.table(db)

    return res.status(201).json(account);
}
const getUserAccount = (req, res) => {

    if (!req.params.user) {
        return res.status(400).json({ error: 'User does not exist' });
    }
    const account = db[req.params.user];

    // Check if account exists
    if (!account) {
        return res.status(404).json({ error: 'User does not exist' });
    }

    return res.json(account);
}
const deleteUserAccount = (req, res) => {
    const account = db[req.params.user];

    // Check if account exists
    if (!account) {
        return res.status(404).json({ error: 'User does not exist' });
    }

    // Removed account
    delete db[req.params.user];

    res.sendStatus(204);
}
const addTransaction = (req, res) => {
    const account = db[req.params.user];

    // Check if account exists
    if (!account) {
        return res.status(404).json({ error: 'User does not exist' });
    }

    // Check mandatory requests parameters
    if (!req.body.date || !req.body.object || !req.body.amount) {
        return res.status(400).json({ error: ' date/object.amount/ Missing parameters' });
    }

    // Convert amount to number if needed
    let amount = req.body.amount;
    if (amount && typeof amount !== 'number') {
        amount = parseFloat(amount);
    }

    // Check that amount is a valid number
    if (amount && isNaN(amount)) {
        return res.status(400).json({ error: 'Amount must be a number' });
    }

    // Generates an ID for the transaction
    const id = crypto
        .createHash('md5')
        .update(req.body.date + req.body.object + req.body.amount)
        .digest('hex');

    // Check that transaction does not already exist
    if (account.transactions.some((transaction) => transaction.id === id)) {
        return res.status(409).json({ error: 'Transaction already exists' });
    }

    // Add transaction
    const transaction = {
        id,
        date: req.body.date,
        object: req.body.object,
        amount,
    };
    account.transactions.push(transaction);

    // Update balance
    account.balance += transaction.amount;

    return res.status(201).json(transaction);
}
const deleteTransaction = (req, res) => {
    const account = db[req.params.user];

    // Check if account exists
    if (!account) {
        return res.status(404).json({ error: 'User does not exist' });
    }

    const nb_transactions =  account.transactions.length;

    account.transactions = account.transactions.filter( ( transaction ) => {
        console.table([account.balance,transaction.id,req.params.id,transaction.id == req.params.id])
        if (transaction.id !== req.params.id) {
            return true;
        }
        account.balance -= transaction.amount;
    });

    if (nb_transactions ==  account.transactions.length) {
        return res.status(404).json({ error: 'Transaction does not exist' });
    }

    // const transactionIndex = account.transactions.findIndex(
    //     (transaction) => transaction.id === req.params.id
    // );

    // // Check if transaction exists
    // if (transactionIndex === -1) {
    //     return res.status(404).json({ error: 'Transaction does not exist' });
    // }

    // // Remove transaction
    // account.transactions.splice(transactionIndex, 1);

    res.sendStatus(204);
}
module.exports = {
    createAccount,
    getUserAccount,
    deleteUserAccount,
    addTransaction,
    deleteTransaction,
}