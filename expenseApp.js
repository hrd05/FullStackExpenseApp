const express = require('express');

const bodyParser = require('body-parser');

const path = require('path');
const sequelize = require('./util/database');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const expenseRoute = require('./routes/expense');

app.use(expenseRoute);


sequelize.sync()
.then((result) => {
    app.listen(4000);
})
.catch(err => console.log(err));

