// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Set up body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set up static files
app.use(express.static(__dirname + '/public'));

// Set up template engine
app.set('view engine', 'ejs');

// Set up data
let comments = [];

// Set up routes
app.get('/', (req, res) => {
    res.render('index', {
        comments: comments
    });
});

app.post('/add-comment', (req, res) => {
    let comment = req.body.comment;
    comments.push(comment);
    res.redirect('/');
});

// Set up server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});