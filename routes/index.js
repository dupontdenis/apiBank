const express = require('express');
const ctrlAccount = require('../controlers/account.js');


// Configure routes
const router = express.Router();

// -------------------ACCOUNTs---------------------------
router
    .route('/')
    // Create an account
    .post(ctrlAccount.createAccount);

// ------------------ACCOUNTS_USER----------------------------
router
    .route('/:user')

    // Get all data for the specified account
    .get(ctrlAccount.getUserAccount)

    // ----------------------------------------------

    // Remove specified account
    .delete(ctrlAccount.deleteUserAccount)

// --------------------ACCOUNTS_USER_TRANSACTIONS--------------------------
router
    .route('/:user/transactions')
    // Add a transaction to a specific account
    .post(ctrlAccount.addTransaction)

// ----------------------------------------------
router
    .route('/:user/transactions/:id')
    // Remove specified transaction from account
    .delete(ctrlAccount.deleteTransaction);

// ***************************************************************************

module.exports = router;