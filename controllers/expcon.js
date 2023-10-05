const path = require('path');
const Expense = require('../models/expenses');

exports.getForm = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'Expense.html'));
};


exports.getExpense = (req, res, next) => {
    Expense.findAll()
    .then((result) => {
       res.status(201).json(result);
    })
    .catch(err => console.log(err));
}

exports.postExpense = (req, res, next) => {

    const amount = req.body.amount;
    const category = req.body.category;
    const description = req.body.description;
    //console.log(amount, category, description);

    Expense.create({
        amount,
        category,
        description
    })
        .then((response) => {
            res.status(201)
            res.redirect('/');
        })
        .catch(err => console.log(err));

};

exports.deleteExpense = (req, res, next) => {
    const id = req.params.id;
    Expense.findByPk(id)
    .then((expense) => {
        return expense.destroy();
    })
    .then(()=> {
        res.status(204).end();
    })
    .catch(err => console.log(err));
}