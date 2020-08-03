import 'source-map-support/register'
import express from "express";
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send('yo')
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});