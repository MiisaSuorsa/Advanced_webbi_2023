var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
router.get('recipe/:food', function(req, res, next) {
  //name: "name of the meal :food", instructions: [list of strings], ingredients: "ingredients"
  res.json({name: req.params.food, instructions: "instructions", ingredients: "ingredients"});
})
*/

module.exports = router;
