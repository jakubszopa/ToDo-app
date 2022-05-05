const express = require('express');
const db = require('./data/database');
const path = require('path');

const todosRoutes = require('./routes/routes.todo')

app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'))

app.use(todosRoutes);

db.connectToDatabase().then(function () {
    app.listen(3000);
})
