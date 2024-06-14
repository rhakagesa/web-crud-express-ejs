"use strict";

const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", AuthController.login);
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", AuthController.registerUser);

router.get("/logout", isLoggedIn, AuthController.logout);

module.exports = router;
