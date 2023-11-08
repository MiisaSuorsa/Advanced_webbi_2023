const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');


router.use(bodyParser.json());

router.post("/", (req, res) => {
    let total = 0;
    for (let i = 0; i < req.body.numbers.length; i++){
        total += req.body.numbers[i];
    }

    res.send({ sum: total});
});


module.exports = router;