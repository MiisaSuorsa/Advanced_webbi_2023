var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'images/'})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use(express.json());
const recipes = [];

router.get('/recipe', function(req, res, next) {
  console.log("I'm here to get");
  let req_name2 = "pitsa";
  let req_instructions = ["step 1:  ", "step 2:  "];
  let req_ingredients = ["pippuri", "suola", "Kurpitsa"];
  res.json({name: req_name2, ingredients: req_ingredients, instructions: req_instructions});
})

router.get('/recipe/:food', function(req, res, next) {
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
router.post('/recipe/', function(req, res, next) {
  console.log("I'm here to post " + req.body.ingredients);
  //add first
  //create lists
  //let ingredientList = req.body.ingredients.split(",");
  //let instructionList = req.body.instructions.split(",");
  //console.log(ingredientList);
  let object ={ name: req.body.name, ingredients: req.body.ingredients, instructions: req.body.instructions };
  //let object ={ name: req.body.name, ingredients: [req.body.ingredients], instructions: [req.body.instructions] };
  //let object ={ name: req.body.name, ingredients: ingredientList, instructions: instructionList };
  recipes.push(object);
  console.log(object.name);
  console.log("added recipe " + req.body.name);
  //res.json(object);
  res.send(object);
  //res.json({ name: req.body.name, ingredients: req.body.ingredients, instructions: req.body.instructions });
  //res.json({ name: req.body.name, ingredients: ingredientList, instructions: instructionList });
})

router.post('/images', upload.array('images'), function(req, res, next) {

  res.send("hi");
})

module.exports = router;
