var express = require('express');
var router = express.Router();

router.use(express.json());

//formData
router.get('/', function(req, res, next) {

    res.send("hi");
})

module.exports = router;
