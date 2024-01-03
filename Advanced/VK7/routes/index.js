var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const {body, validationResult} = require("express-validator");
const session = require('express-session');

router.use(express.json())

const users = [];
const todoList = [];

router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

function isLoggedIn (req, res, next) {
  console.log(req.body.username)
  if (req.session.user) {
    //let user = users.find(user => user.username === req.session.user.username)
    if (req.session.user.username == req.body.username) {
      res.redirect('/');
    }
    else next();
  }
  else next();
}

//done similary to the lecture video
router.post('/api/user/register',
  body("username").isLength({min: 3}).trim().escape(),
  body("password").isLength({min: 3}),
  isLoggedIn,
  (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    let user = users.find(user => user.username === req.body.username)

    if(user){
      return res.status(400).send("Username already in use.");
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if(err) throw err;
          let object = { username: req.body.username, password: hash };
          users.push(object);
          res.send(object);
        })
      })
    }
});



router.get('/api/user/list', (req, res, next) => {
  res.send(users);
});


router.post('/api/user/login',
  body("username").trim().escape(),
  body("password").escape(),
  isLoggedIn,
  (req, res, next) => {

    let user = users.find(user => user.username === req.body.username);
    if (!user){
      return res.status(401).send("Register before login.");
    } else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          //use session cookies
          req.session.user = user;
          req.session.user.username = req.body.username;
          req.session.save();
          res.status(200).send(req.session.cookie['connect.sid']);
        } else {
          res.status(401).send("Invalid password.");
        }
      })
    }
});



function isAuthenticated (req, res, next) {
  if (req.session.user) next()
  else res.status(401).send("Log in first.");
};


router.get('/api/secret', isAuthenticated, (req, res, next) => {
  //isAuthenticated function checks if user is logged in

  res.status(200).send("Authenticated user");

});



router.post('/api/todos', isAuthenticated, (req, res, next) => {

  if ( todoList.length === 0){
    //add first
    let object = { username: req.session.user.username, todos: [req.body.todos] };
    todoList.push(object);
    console.log("added user");
    res.send(object);

  }
  else{
    console.log("päivitetään lista: ");

    for ( let i = 0; i < todoList.length; i++ ){

        let user = todoList.find(user => user.username === req.session.user.username);
        if (user){
            todoList[i].todos.push(req.body.todos);
            console.log("listaan päivitetty: " + JSON.stringify(todoList));
            res.send(todoList[i]);
            return
        }
        else{
          let object = { username: req.session.user.username, todos: [req.body.todos] };
            todoList.push(object);
            console.log("added new user");
            res.send(object);
            return
        }
    }
  }

})

router.get('/api/todos/list', (req, res, next) => {
  res.send(todoList);
})

module.exports = router;
