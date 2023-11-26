var express = require('express');
var router = express.Router();

router.use(express.json());
const recipes = [];

router.get('/', function(req, res, next) {
  console.log("I'm here to get");
  //let req_name = req.params.food;
  let req_name2 = "pitsa";
  //res.json({name: req_name, instructions: "instructions", ingredients: "ingredients"});
  //res.render('index', { title: req_name });
  //name: "name of the meal :food", instructions: [list of strings], ingredients: "ingredients"
  let req_instructions = ["step 1:  ", "step 2:  "];
  let req_ingredients = ["pippuri", "suola", "Kurpitsa"];
  res.json({name: req_name2, instructions: req_instructions, ingredients: req_ingredients});
  //res.end();
})

router.get('/:food', function(req, res, next) {
  console.log("I'm here to get");
  let req_name = req.params.food;

  //res.json({name: req_name, instructions: "instructions", ingredients: "ingredients"});
  //res.render('index', { title: req_name });
  //name: "name of the meal :food", instructions: [list of strings], ingredients: "ingredients"
  let req_instructions = ["step 1:  ", "step 2:  "];
  let req_ingredients = ["pippuri", "suola", "Kurpitsa"];
  res.json({name: req_name, instructions: req_instructions, ingredients: req_ingredients});
  //res.end();
})

//save new recipe into a list
router.post('/', function(req, res, next) {
  console.log("I'm here to post");
  //add first
  let object ={ name: req.body.name, instructions: [req.body.instructions], ingredients: [req.body.ingredients] };
  recipes.push(object);
  console.log("added recipe " + req.body.name);
  res.json({ name: req.body.name, instructions: [req.body.instructions], ingredients: [req.body.ingredients] });
  /*
  if ( recipes.length === 0){
    //add first
    let object ={ name: req.body.name, instructions: [req.body.instructions], ingredients: [req.body.ingredients] };
    recipes.push(object);
    console.log("added recipe " + req.body.name);
    res.json({ name: req.body.name, instructions: [req.body.instructions], ingredients: [req.body.ingredients] });

  }
  else{
    console.log("päivitetään lista: ");

    for ( let i = 0; i < todoList.length; i++ ){

        let recipe = recipes.find(recipe => recipe.name === req.body.name);
        if (recipe){
            recipes[i].instructions.push(req.body.instructions);
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
  */
})


module.exports = router;