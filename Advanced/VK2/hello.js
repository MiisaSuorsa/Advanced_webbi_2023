const express = require("express");
const router = express.Router();

let message = {
    msg: "Hello world"
};


router.get("/", (req, res) => {
    res.json(message);
});


module.exports = router;
