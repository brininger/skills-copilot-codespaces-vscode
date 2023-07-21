// Creat web server

// 1. Import Express
const express = require('express');

// 2. Create an express app
const app = express();

// 3. Import file system
const fs = require('fs');

// 4. Import path
const path = require('path');

// 5. Import body-parser
const bodyParser = require('body-parser');

// 6. Import mongoose
const mongoose = require('mongoose');

// 7. Import model
const Comment = require('./models/comment');

// 8. Connect to database
mongoose.connect('mongodb://localhost:27017/express-demo', { useNewUrlParser: true });

// 9. Set view engine
app.set('view engine', 'pug');

// 10. Set view folder
app.set('views', './views');

// 11. Set static folder
app.use(express.static('public'));

// 12. Set body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 13. Create home route
app.get('/', (req, res) => {
    res.render('index', {
        name: 'AAA'
    });
});

// 14. Create comments route
app.get('/comments', (req, res) => {
    Comment.find().then((comments) => {
        res.render('comments/index', {
            comments: comments
        });
    });
});

// 15. Create comments/new route
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

// 16. Create comments post route
app.post('/comments', (req, res) => {
    const comment = new Comment(req.body);
    comment.save().then(() => {
        res.redirect('/comments');
    });
});

// 17. Create comments/:id route
app.get('/comments/:id', (req, res) => {
    Comment.findById(req.params.id).then((comment) => {
        res.render('comments/show', {
            comment: comment
        });
    });
});

// 18. Create comments/:id/edit route
app.get('/comments/:id/edit', (req, res) => {
    Comment.findById(req.params.id).then((comment) => {
        res.render('comments/edit', {
            comment: comment
        });
    });
});

// 19. Create comments/:id PUT route
app.put('/comments/:id', (req, res) => {
    Comment.findByIdAndUpdate(req