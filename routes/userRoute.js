"use strict";

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const { userAuthorization } = require("../middlewares/authorization");

router.use(authentication);
router.get("/page/user", (req, res) => {
    res.render("user");
})
router.get("/", UserController.getAllUsers);
router.get("/info", UserController.getUser);
router.post("/update/:id", userAuthorization, UserController.updateUser);
router.get("/delete/:id", userAuthorization, UserController.deleteUser);

module.exports = router;
