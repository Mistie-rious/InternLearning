import http from 'http'
import app from './app'

const PORT = process.env.PORT;

//routes

const server = http.createServer(app)

//use routes

server.listen(PORT, () => { 
    console.log("Server running at PORT: ", PORT); 
  }).on("error", (error: any) => {
    throw new Error(error.message);
  })