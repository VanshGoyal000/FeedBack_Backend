const express = require('express');
const User = require('../models/user.model'); // Import User model correctly
const router = express.Router();
const bcrypt = require('bcrypt')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('index');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/profile', function(req, res, next) {
  res.render('profile');
});

// router.post('/signup', async function(req, res) {
//   try {
//     const newUser = await User.create({
//       email: req.body.email,
//       password: req.body.password
//     });

//     const existingUser = await  User.findOne({email: newUser.email})

//     if(existingUser){
//       res.send('User already exist');
//     }
//     else{
//       const salt = 10;
//       const hashedPass = await bcrypt.hash(data.password , salt)
//       data.password = hashedPass;
//       console.log("New user created", data )
//       const udata = User.insertMany([data]);
//       return res.status(201).render("profile");
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Error creating user");
//   }


// });
router.post('/signup', async function(req, res) {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.send('User already exists');
    } else {
      const salt = 10;
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      
      // Create a new user object with hashed password
      const newUser = new User({
        email: req.body.email,
        password: hashedPass
      });

      // Save the new user to the database
      await newUser.save();

      console.log("New user created", newUser);
      return res.status(201).render("profile");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error creating user");
  }
});


router.post('/login', async function(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send("Email not found");
    }

    const passCheck = await bcrypt.compare(req.body.password, user.password);
    if (!passCheck) {
      return res.send("Wrong password");
    }

    // If both email and password are correct, render the profile page
    res.render('profile.ejs');
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during login");
  }
});


router.post('/profile' , function(req , res){
  res.render('profile.ejs');
});

module.exports = router;
