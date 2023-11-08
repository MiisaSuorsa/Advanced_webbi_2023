const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require("fs");

/*let inputText = [];

fs.readFile('./inputText.json', "utf-8", (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    //let inputText = [];
    //console.log("tämäm on " + data)
    inputText = [data];
    //inputText.push(data);
    //inputText = JSON.parse(data);
    console.log("Data loaded!")

})

*/
router.use(bodyParser.json());
const inputText = [];
router.post("/", (req, res) => {
    //console.log(req.body.text);
    //console.log(req.body);
    let text = req.body.text;
    inputText.push(text);
    //inputText = JSON.stringify(req.body.text);
    fs.writeFile("./inputText.json", JSON.stringify(inputText), err => {
        if(err) {
            console.log(err);
            return;
        }
    })
    res.json({list: inputText});
});


module.exports = router;