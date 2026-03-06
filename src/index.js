import express from 'express';
import {matchRouter} from "./routes/matches.js";

const app  = express();

const port  = process.env.PORT || 8000

app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello From Express Server!');
})

app.use('/matches', matchRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
