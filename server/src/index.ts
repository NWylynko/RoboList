import 'source-map-support/register'
import express from "express";
import bodyParser from 'body-parser';
const app = express();
const port = 8080;

app.use(bodyParser.json())

let data: any = {}

app.get("/", (req, res) => {
  res.send(data)
});

app.post("/", (req, res) => {
  console.log(req.body)
  const { id, ip } = req.body;
  data[id] = {ip}
  res.send('success')
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});