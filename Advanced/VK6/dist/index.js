"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
let vehicles = [];
app.get("/", (req, res) => {
    res.send("hello");
});
app.get("/hello", (req, res) => {
    res.send("Hello world");
});
app.post("/vehicle/add", (req, res) => {
    let vehicle = req.body;
    vehicles.push(vehicle);
    console.log(vehicles);
    res.status(201).send("Vehicle added.");
});
app.get("/vehicle/search/:model", (req, res) => {
    let search = req.params.model;
    let searched = vehicles.find(item => item.model == search);
    if (searched) {
        res.send(searched);
    }
    else {
        res.status(404).send("No such vehicle");
    }
});
app.listen(port, () => {
    console.log("server is runnign at http://localhost:" + port);
});
