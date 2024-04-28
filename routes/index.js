var express = require('express');
var router = express.Router();
const User = require('../models/user.model')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/thanks', function(req, res, next) {
  res.render('thanks');
});

router.post('/', function(req, res) {
  const data = {
      name: req.body.name,
      email: req.body.email,
      feedback: req.body.feedback,
      reviewOption : req.body.reviewOption
  };
  console.log(data);
  // Check if user with the same email already exists
  User.findOne({ email: data.email })
      .then(existingUser => {
          if (existingUser) {
              console.log("User already exists with email: " + data.email);
              return res.render("already"); 
          } else {
             
              User.create(data)
                  .then(user => {
                      console.log("User created: " + user);
                      return res.redirect("/thanks");
                  })
                  .catch(error => {
                      console.log("Error in creating the user: " + error);
                      return res.redirect("/error");
                  });
          }
      })
      .catch(error => {
          console.log("Error finding user: " + error);
          return res.redirect("/error");
      });
});




module.exports = router;

