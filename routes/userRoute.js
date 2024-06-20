"use strict";

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.use(isLoggedIn);
router.get("/", UserController.getAllUsers);
router.get("/info", UserController.getUser);
router.post("/update/:id",  UserController.updateUser);
router.get("/delete/:id", UserController.deleteUser);

module.exports = router;
