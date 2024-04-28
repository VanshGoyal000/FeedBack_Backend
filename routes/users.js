const express = require('express');
const User = require('../models/user.model'); // Import User model correctly
const router = express.Router();
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/thanks', function(req, res, next) {
  res.render('thanks');
});


module.exports = router;
