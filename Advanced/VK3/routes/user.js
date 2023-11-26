var express = require('express');
var router = express.Router();

/* GET users */
router.get('/:id', function(req, res, next) {
    console.log(req.body.name)
});

module.exports = router;
