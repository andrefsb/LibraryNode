import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";

db.on("error",console.log.bind(console,"Connection error"));
db.once("open",()=>{
  console.log("DB connection was successful.");
});

const app = express();
app.use(express.json());
routes(app);

app.use(manipuladorDeErros);

export default app;