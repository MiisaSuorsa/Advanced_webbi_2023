var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const todoList = [];
router.use(express.json());

/* POST todos */
router.post('/todo', function(req, res, next) {

  if ( todoList.length === 0){
    //add first
    let object ={ name: req.body.name, todos: [req.body.todos] };
    todoList.push(object);
    console.log("added user");
    res.json({ res: "User added"});

  }
  else{
    console.log("päivitetään lista: ");

    for ( let i = 0; i < todoList.length; i++ ){

        let user = todoList.find(user => user.name === req.body.name);
        if (user){
            todoList[i].todos.push(req.body.todos);
            console.log("listaan päivitetty: " + JSON.stringify(todoList));
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

/* GET user and todos */
router.get('/user/:id', function(req, res, next) {

  let user = todoList.find(user => user.name === req.params.id);
    //response with user's name and todos
  if (user){
      res.json({ res: JSON.stringify(user)});
      return
  }
  else{
      res.json({ res: "User not found"});
      return
  }

})

/* DELETE user */
router.delete('/user/:id', function(req, res, next) {
  let user = todoList.find(user => user.name === req.params.id);
  let count = 0;
  for ( let i = 0; i < todoList.length; i++ ) {
    if ( todoList[i].name === user.name ) {
      todoList.splice(count, 1);
      res.json({ res: "User deleted"});
      return
    }
    count++;
  }
  res.json({ res: "User not found"});
})

module.exports = router;
