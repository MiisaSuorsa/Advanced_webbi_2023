var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const fs = require("fs");

router.use(bodyParser.json());
//const todoList = [];

/* POST todo page. */
router.post('/', function(req, res, next) {
    console.log("täällä");

    /*
    console.log("lista: " + JSON.stringify(todoList));
    console.log("listan eka: " + JSON.stringify(todoList[0]));
    console.log("listan eka nimi: " + JSON.stringify(todoList[0].name));
    */
    fs.readFile('./data.json', "utf-8", (err, data) => {
        if(err) {
            console.log(err);
            return;
        }
        let todoList = [];
        todoList = [data];
        console.log("tämäm on " + todoList);
        //inputText.push(data);
        if ( todoList.length > 0 ){
            todoList = JSON.parse(data);
            console.log("Data loaded!")
        }

    })

    if ( todoList.length === 0){
        //add first
        let object ={ name: req.body.name, todos: [req.body.todos] };
        //todoList.push(object);
        console.log("added user");
        //res.send("User added");

        fs.writeFile("../data.json", JSON.stringify(object), err => {
            if(err) {
                console.log(err);
                return;
            }
        })
        res.send("User added");

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
                res.send("Todo added");
                return
            }
            else{
                let object ={ name: req.body.name, todos: [req.body.todos] };
                todoList.push(object);
                console.log("added new user");
                res.send("User added");
                return
            }
        }
    }
});

module.exports = router;
