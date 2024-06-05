"use strict";

const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const authentication = require("../middlewares/authentication");

router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", AuthController.login);
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", AuthController.registerUser);

router.use(authentication);
router.get("/logout", AuthController.logout);

module.exports = router;
