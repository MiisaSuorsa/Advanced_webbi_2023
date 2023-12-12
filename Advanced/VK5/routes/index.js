var express = require('express');
const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'images/'})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use(express.json());
const recipes1 = [];

router.get('/recipe', function(req, res, next) {
  console.log("I'm here to get");
  let req_name2 = "pitsa";
  let req_instructions = ["step 1:  ", "step 2:  "];
  let req_ingredients = ["pippuri", "suola", "Kurpitsa"];
  res.json({name: req_name2, ingredients: req_ingredients, instructions: req_instructions});
})

router.get('/recipe/:food', function(req, res, next) {
  console.log("I'm here to get");

  //const name = req.params.food;
  Recipe.findOne( { name: req.params.food }, (err, recipe) => {
    if (err) return next(err);

    if(recipe){
      return res.json(recipe);
    }
    else {
      return res.status(404).send("Don't have this recipe");
    }
  });

/*
  let req_name = req.params.food;
  let recipe = recipes1.find(recipe => recipe.name === req_name);

  if (recipe) {
    console.log(recipe.instructions[0]);
    res.json(recipe);
  }
  else{
    let req_instructions = ["step 1:  ", "step 2:  "];
    let req_ingredients = ["pippuri", "suola", "Kurpitsa"];
    res.json({name: req_name, ingredients: req_ingredients, instructions: req_instructions});
  }
  */
})

//save new recipe into a list
router.post('/recipe/', function(req, res, next) {
  console.log("I'm here to post " + req.body.ingredients);
  console.log(req.body.ovo);


  Recipe.findOne({ name: req.body.name }, (err, recipe) => {
    if (err) return next(err);

    if (!recipe) {
      new Recipe({
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
      }).save((err) => {
        if(err) return next(err);
        return res.send(req.body);
      })
    } else {
      return res.status(403).send("Already have this recipe");
    }
  })
  //let object ={ name: req.body.name, ingredients: req.body.ingredients, instructions: req.body.instructions };
  //recipes.push(object);
  //console.log(object.name);
  //console.log("added recipe " + req.body.name);
  //res.send(object);
})

router.post('/images', upload.array('images'), function(req, res, next) {

  res.send("hi");
})

module.exports = router;
