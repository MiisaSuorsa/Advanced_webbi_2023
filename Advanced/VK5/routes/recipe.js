var express = require('express');
var router = express.Router();

router.use(express.json());
const recipes = [];

router.get('/', function(req, res, next) {
  console.log("I'm here to get");
  let req_name2 = "pitsa";
  let req_instructions = ["step 1:  ", "step 2:  "];
  let req_ingredients = ["pippuri", "suola", "Kurpitsa"];
  res.json({name: req_name2, ingredients: req_ingredients, instructions: req_instructions});
})

router.get('/:food', function(req, res, next) {
  console.log("I'm here to get");
  let req_name = req.params.food;
  let recipe = recipes.find(recipe => recipe.name === req_name);

  if (recipe) {
    console.log(recipe.instructions[0]);
    res.json(recipe);
  }
  else{
    let req_instructions = ["step 1:  ", "step 2:  "];
    let req_ingredients = ["pippuri", "suola", "Kurpitsa"];
    res.json({name: req_name, ingredients: req_ingredients, instructions: req_instructions});
  }
})

//save new recipe into a list
router.post('', function(req, res, next) {
  console.log("I'm here to post");
  //add first
  //create lists
  console.log(req.body.ingredients);
  let ingredientList = req.body.ingredients.split(",");
  let instructionList = req.body.instructions.split(",");
  console.log(ingredientList);
  //let object ={ name: req.body.name, ingredients: [req.body.ingredients], instructions: [req.body.instructions] };
  let object ={ name: req.body.name, ingredients: ingredientList, instructions: instructionList };
  recipes.push(object);
  console.log("added recipe " + req.body.name);
  //res.json({ name: req.body.name, ingredients: [req.body.ingredients], instructions: [req.body.instructions] });
  res.json({ name: req.body.name, ingredients: ingredientList, instructions: instructionList });
})


module.exports = router;