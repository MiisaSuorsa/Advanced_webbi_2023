var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/user.js');
//var todoRouter = require('./routes/todo.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/user', usersRouter);
//app.use('/todo', todoRouter);

//POST in todo list
/*
const todoList = [];
app.post('/todo', function(req, res, next) {

  if ( todoList.length === 0){
    //add first
    let object ={ name: req.body.name, todos: [req.body.todos] };
    todoList.push(object);
    console.log("added user");
    //res.send("User added");
    res.json({ res: "User added"});

  }
  else{
    console.log("päivitetään lista: ");

    for ( let i = 0; i < todoList.length; i++ ){
        //let obj = todoList[i];
        //let name = JSON.stringify(todoList[i].name);

        let user = todoList.find(user => user.name === req.body.name);
        if (user){
            todoList[i].todos.push(req.body.todos);
            console.log("listaan päivitetty: " + JSON.stringify(todoList));
            //res.send("Todo added");
            res.json({ res: "Todo added"});
            return
        }
        else{
            let object ={ name: req.body.name, todos: [req.body.todos] };
            todoList.push(object);
            console.log("added new user");
            res.json({ res: "User added"});
            return
        }
    }
  }
})
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
