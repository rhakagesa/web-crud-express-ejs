"use strict";

const express = require("express");
const session = require("express-session");
const app = express();
const port = 3001;

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "rahasia",
    resave: false,
    saveUninitialized: true,
  })
)

app.set("view engine", "ejs");
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/task", taskRoute);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).render("index");
});

const server = app.listen(port, () => {
  console.log(`Example app http://localhost:${port}`);
});

module.exports = { server, app };
