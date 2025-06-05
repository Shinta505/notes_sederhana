import express from "express";
import cors from "cors";
import NoteRoute from "./routes/NoteRoute.js";
import UserRoute from "./routes/UserRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(
  cors({
    origin: "http://127.0.0.1:5500/", // <- Diganti sama alamat front-end
    credentials: true,
  })
);
app.use(express.json());
app.get("/", (req, res) => res.render("index"));
app.use(UserRoute);
app.use(NoteRoute);

app.listen(5000, () => console.log("Server connected"));
