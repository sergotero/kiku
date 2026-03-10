import express from "express";
import morgan from "morgan";
import "./src/config/database.config.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.listen(process.env.API_SERVER_PORT, () => {
  console.log(`Server running at http://localhost:${process.env.API_SERVER_PORT}`);
})