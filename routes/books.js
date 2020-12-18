var express = require('express');
var router = express.Router();

// import controller for books
var booksController = require('../controllers/ioController');


router.get('/', booksController.connect);


module.exports = router;
