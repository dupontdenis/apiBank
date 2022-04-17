const db = require('../models');


const createAccount = (req, res) => {
    // Check mandatory request parameters
    if (!req.body.user || !req.body.currency) {
        return res.status(400).json({ error: 'Missing parameters' });
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
        currency: req.body.currency,
        description: req.body.description || `${req.body.user}'s budget`,
        balance: balance || 0,
        transactions: [],
    };
    db[req.body.user] = account;
    console.table(db)

    return res.status(201).json(account);
}
const getUserAccount = (req, res) => {
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
module.exports = {
    createAccount,
    getUserAccount,
    deleteUserAccount,
}