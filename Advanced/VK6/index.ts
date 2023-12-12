import express, {Express, Request, Response} from "express"

const app: Express = express();
const port: number = 3000;

app.use(express.json())

let vehicles: { model: string, color: string, year: number, power: number, bodyType?: string, wheelCount?: number }[] = [];

type Vehicle = {
    model: string,
    color: string,
    year: number,
    power: number,
    bodyType?: string,
    wheelCount?: number
};

app.get("/", (req: Request, res: Response) => {
    res.send("hello");
});

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello world");
});


app.post("/vehicle/add", (req: Request, res: Response) => {
    let vehicle : Vehicle = req.body;

    vehicles.push(vehicle);
    console.log(vehicles);

    res.status(201).send("Vehicle added.");
});


app.get("/vehicle/search/:model", (req: Request, res: Response) => {
    let search: string = req.params.model;

    let searched = vehicles.find(item => item.model == search);

    if (searched) {
        res.send(searched);
    }
    else{
        res.status(404).send("No such vehicle");
    }

});

app.listen(port, () => {
    console.log("server is runnign at http://localhost:" + port);
});