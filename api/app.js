import express from "express";
import morgan from "morgan";
import { default as apiRouter } from "./src/config/api-routes.config.js";
import { default as webRouter } from "./src/web/index.js"
import "./src/config/database.config.js";


const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Load apiRoutes
app.use("/api", apiRouter);

// Load REACT App
app.use(webRouter);

app.listen(process.env.API_SERVER_PORT, () => {
  console.log(`Server running at http://localhost:${process.env.API_SERVER_PORT}`);
})