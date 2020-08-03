import 'source-map-support/register'
import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors'
import Joi from 'joi';
const app = express();
const port = 8080;

const schema = Joi.object({
  id: Joi.string().required(),
  ip: Joi.string().required()
})

app.use(cors())
app.use(bodyParser.json())

let data: any = {}

app.get("/", (req, res) => {
  res.send(data)
});

app.post("/",(req, res) => {
  console.log(req.body)
  try {
    const result = schema.validate(req.body);
    if (result.error) {
      throw new Error(result.error.details[0].message)
    }
    const { id, ip } = result.value;
    data[id] = {id, ip}
    res.send('success')
  } catch (error) {
    res.send(error)
  }
  
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});