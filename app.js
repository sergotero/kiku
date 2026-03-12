import cors from "./src/middlewares/cors.middleware.js";
import express from "express";
import morgan from "morgan";
import router from "./src/config/routes.config.js";
import errors from "./src/middlewares/errors.middleware.js";
import "./src/config/database.config.js";
import checkAuth from "./src/middlewares/auth.middleware.js";


const app = express();

app.use(cors);
app.use(express.json());
app.use(morgan("dev"));
app.use(checkAuth);
app.use(router);

app.use(errors);

app.listen(process.env.API_SERVER_PORT, () => {
  console.log(`Server running at http://localhost:${process.env.API_SERVER_PORT}`);
})