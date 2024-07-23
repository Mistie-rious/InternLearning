import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
const morgan = require('morgan')
import connectToMongoDB from "./init/mongoDb";
import { authRoute, categoryRoute, courseRoute, contentRoute, fileRoute} from "./routes";
dotenv.config();
const app = express();
import errorHandler from "./middlewares/errorHandler";
import { notFound } from "./controllers";


//mongo
connectToMongoDB()
app.use(express.json({limit: '500mb'}))
app.use(bodyParser.urlencoded({limit: '500mb', extended:true}))
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/content", contentRoute);
app.use('/api/v1/file', fileRoute)

//not found
app.use('*',notFound);
//error handling
app.use(errorHandler);




app.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello Worldd");
}); 


export default app;