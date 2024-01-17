var express = require('express');
const mongoose = require("mongoose");
const Users = require('../models/Users');
const Todos = require('../models/Todo');
const bcrypt = require("bcryptjs");
const {body, validationResult} = require("express-validator");
const jwt = require('jsonwebtoken');
const validateToken = require('../authentication/validateToken.js');


var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/user/register',
  body("email").isLength({min: 10}).trim().escape(),
  body("password").isLength({min: 3}),
  (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    Users.findOne({ email: req.body.email }, (err, user) => {
      if (err) return next(err);

      if(user){
        return res.status(403).send("Email already in use.");
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) throw err;
            new Users({
              email: req.body.email,
              password: hash
            }).save((err) => {
              if(err) return next(err);
              return res.send("ok");
            })
          })
        })
      }
    })

})

const userList = [];

router.post('/api/user/login',
  body("email").isLength({min: 10}).trim().escape(),
  body("password").isLength({min: 3}),
  (req, res, next) => {

    Users.findOne({ email: req.body.email }, (err, user) => {
      if (err) return next(err);

      if (!user){
          return res.status(401).send("Register before login.");
        } else {
          bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              console.log(user)
              const object = {
                user: user._id,
                email: user.email
              }
              userList.push(object)
              console.log(userList)
              //use jwt
              const jwtPayload = {
                  id: user._id,
                  email: user.email
              }
              jwt.sign(
                  jwtPayload,
                  process.env.SECRET,
                  {
                      expiresIn: 120
                  },
                  (err, token) => {
                      res.json({success: true, token});
                  }
              )
            } else {
              res.status(401).send("Invalid password.");
            }
          })
        }
  })
})

router.get('/api/private', validateToken, function(req, res, next) {
  const list_length = userList.length -1;
  res.json({email: userList[list_length].email});
});


router.post('/api/todos', validateToken, function(req, res, next){
  Todos.findOne({ email: req.body.email }, (err, todo) => {
    if (err) return next(err);

    if (!todo){
      const list_length = userList.length -1;
      Todos.create({
        user: userList[list_length].user,
        items: [req.body.items]
      })
      console.log(todo)
    } else {
      todo.items.push(req.body.items);
      console.log(todo)
    }
    res.send(todo.items);

  })
})

module.exports = router;
