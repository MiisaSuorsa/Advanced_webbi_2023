var express = require('express');
const mongoose = require("mongoose");
const Users = require('../models/Users');
const bcrypt = require("bcryptjs");
const {body, validationResult} = require("express-validator");
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const validateToken = require('../authentication/validateToken.js');
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({storage})
var router = express.Router();


const user = [];

router.get('/register', (req, res, next) => {
  res.render('register.html');
})

router.post('/register',
  body("email").isLength({min: 10}).trim().escape(),
  body("password").isLength({min: 8}),
  (req, res, next) => {

    console.log(req.body.email);
    console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    Users.findOne({ email: req.body.email }, (err, user) => {
      if (err) return next(err);

      if(user){
        return res.status(403).json({msg: "Email already in use."});
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) throw err;
            Users.create({
              email: req.body.email,
              password: hash
            }, (err, ok) => {
              if(err) return next(err);
              return res.json({msg: "ok"});
            })
          })
        })
      }
    })

})

router.get('/login', function(req, res, next) {
  res.render('login.html');
});

router.post('/login',
  (req, res, next) => {

    Users.findOne({ email: req.body.email }, (err, user) => {
      if (err) return next(err);
      console.log(req.body.email);
      if (!user){
          return res.status(401).send("Register before login.");
        } else {
          bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              //user = [];
              //user.push(user.email);
              //use jwt
              const jwtPayload = {
                  id:user._id,
                  email: user.email
              }
              jwt.sign(
                  jwtPayload,
                  process.env.SECRET,
                  {
                      expiresIn: 120
                  },
                  (err, token) => {
                    console.log("sending response");
                    res.json({success: true, token: token});
                  }
              )
            } else {
              res.status(402).send("Invalid password.");
            }
          })
        }
  })
})


router.get('/secret', validateToken, function(req, res, next) {
  //res.render('index.html');
  console.log("User validated");
  //const decoded = jwtDecode(req.headers['authorization']);
  //console.log(user);
  //res.json({email: user});
  res.json({email: "user"});
});


module.exports = router;
