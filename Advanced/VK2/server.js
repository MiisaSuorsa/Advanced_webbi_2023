

//setting up server with express
const express = require("express");
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname, './static')));

app.get("/", (req, res) => {
    res.send("Moikka maailma");
    res.sendFile(path.join(__dirname, './static', 'index.html'));
});


app.use("/hello", require("./hello.js"));
app.use("/echo", require("./echo.js"));
app.use("/sum", require("./sum.js"));
//app.use("/index", require("./index.js"));
app.use("/list", require("./list.js"));

app.listen(port);


//setting up server with just node.js
/*
const http = require("http");

http.createServer(function(req, res){
    res.write("Hellou maailma");
    res.end();
}).listen(8000);
*/
