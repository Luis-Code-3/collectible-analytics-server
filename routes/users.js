var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../models/users/Users.model');
const isAuthenticated = require('../middleware/isAuthenticated')

/* GET users listing. */
router.post('/signup', (req, res) => {
  const {username, email, password} = req.body;

  if(!username || !email || !password) {
    return res.status(400).json({message:"please fill out all fields"})
  }

  Users.findOne({ $or: [{ email: email }, { username: username }] })
    .then((foundUser) => {
      if(foundUser) {
        if(foundUser.email === email && foundUser.username === username) {
          return res.status(400).json({message: "Both Username and Email are taken."})
        } else if (foundUser.email === email) {
          return res.status(400).json({message: " Email is already taken."})
        } else {
          return res.status(400).json({message: "Username is already taken."})
        }
      } else {
        const salt = bcrypt.genSaltSync()
        const hashedPassword = bcrypt.hashSync(password, salt)
        
        Users.create({
          username: username,
          email: email,
          password: hashedPassword
        })
          .then((createdUser) => {
            console.log(createdUser);
            const accessToken  = jwt.sign({_id: createdUser._id, username: createdUser.username}, process.env.SECRET);
            res.json({accessToken, message: `Welcome ${createdUser.username}`});
          })
          .catch((err) => {
            res.status(400).json(err.message)
            //console.log(err);
          })
      }
    })
    .catch((err) => {
      res.status(400).json(err.message)
    })
});


router.post('/login', (req,res) => {
  const {username, password} = req.body;

  if(!username || !password) {
    return res.status(400).json({message:"please fill out all fields"})
  }

  Users.findOne({username: username})
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(401).json({ message: "Email or Password is incorrect!!!" });
      }

      if(bcrypt.compareSync(password, foundUser.password)) {
        const accessToken  = jwt.sign({_id: foundUser._id, username: foundUser.username}, process.env.SECRET);
        res.json({accessToken, message: `Welcome ${foundUser.username}`});
      } else {
        return res.status(401).json({ message: "Email or Password is incorrect!!!" });
      }
    })
    .catch((err) => {
      console.log(err);
    })
});

router.post('/verify', isAuthenticated, (req, res) => {
  return res.status(200).json(req.user);
})

module.exports = router;
