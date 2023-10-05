const express = require('express');

const router = express.Router();

const expenseConstroller = require('../controllers/expcon');

router.get('/', expenseConstroller.getForm );

router.post('/expense', expenseConstroller.postExpense);

router.get('/expense', expenseConstroller.getExpense);

router.delete('/expense/:id', expenseConstroller.deleteExpense);

module.exports = router;