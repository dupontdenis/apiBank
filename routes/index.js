const express = require('express');
const crypto = require('crypto');
//const db = require('../models');
const ctrlAccount = require('../controlers/account.js');


// Configure routes
const router = express.Router();

// -------------------ACCOUNTs---------------------------
router
    .route('/accounts')
    // Create an account
    .post(ctrlAccount.createAccount);

// ------------------ACCOUNTS_USER----------------------------
router
    .route('/accounts/:user')

    // Get all data for the specified account
    .get(ctrlAccount.getUserAccount)

    // ----------------------------------------------

    // Remove specified account
    .delete(ctrlAccount.deleteUserAccount)

// --------------------ACCOUNTS_USER_TRANSACTIONS--------------------------
router
    .route('/accounts/:user/transactions')
    // Add a transaction to a specific account
    .post(ctrlAccount.addTransaction)

// ----------------------------------------------
router
    .route('/accounts/:user/transactions/:id')
    // Remove specified transaction from account
    .delete(ctrlAccount.deleteTransaction);

// ***************************************************************************

module.exports = router;