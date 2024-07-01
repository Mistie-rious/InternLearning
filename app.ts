import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
const morgan = require('morgan')
import connectToMongoDB from "./init/mongodb";
dotenv.config();
const app = express();

//mongo
connectToMongoDB()
app.use(express.json({limit: '500mb'}))
app.use(bodyParser.urlencoded({limit: '500mb', extended:true}))
app.use(morgan("dev"));


app.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello Worldd");
}); 


export default app;