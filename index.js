import express from "express";
import { routers } from "./src/routers/routers.js";
import path from "path";
// import dotenv from "dotenv"; //Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
import "dotenv/config";

// dotenv.config();

const app = express();
const port = 3002;
let __dirname = path.resolve(path.dirname(""));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(routers);
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Estou rodando na porta: ${port}`);
});
