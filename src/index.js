import express from 'express';
import http from 'http';
import {matchRouter} from "./routes/matches.js";
import {attachWebSocketServer} from "./ws/server.js";


const PORT  = process.env.PORT || 8000
const HOST  = process.env.HOST || 'localhost'

const app  = express();
const server = http.createServer(app);

app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello From Express Server!');
})

app.use('/matches', matchRouter);

const {broadcastMatchCreated } = attachWebSocketServer(server)
app.locals.broadcastMatchCreated = broadcastMatchCreated;

server.listen(PORT, HOST, () => {
    const base_url = HOST === "0.0.0.0" ? `http://localhost:${PORT}` : `http://${HOST}:${PORT}`;
    console.log(`Server running on ${base_url}`);
    console.log(`Websocket Server is running on ${base_url.replace('http', 'ws')}/ws`);
})
