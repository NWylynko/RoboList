import 'source-map-support/register'
import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import bodyParser from 'body-parser';
import cors from 'cors'
import Joi from 'joi';
const app = express();
//initialize a simple http server
const server = http.createServer(app);
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
const port = 8080;

const schema = Joi.object({
  id: Joi.string().required(),
  ip: Joi.string().required(),
  hostname: Joi.string().required()
})

app.use(cors())
app.use(bodyParser.json())

let data: any = {}

wss.on('connection', client => {
  client.send(JSON.stringify(data))
});

app.get("/", (req, res) => {
  res.json(data)
});

app.post("/",(req, res) => {
  console.log(req.body)
  try {
    const result = schema.validate(req.body);
    if (result.error) {
      throw new Error(result.error.details[0].message)
    }
    data[result.value.id] = result.value
    wss.clients.forEach(client => client.send(JSON.stringify(data)));
    res.send('success')
    
  } catch (error) {
    res.send(error)
  }
  
});

server.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});