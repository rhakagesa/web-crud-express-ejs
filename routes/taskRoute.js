"use strict";

const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();
const TaskController = require("../controllers/taskController");

router.use(isLoggedIn);
router.get("/create", (req, res) => {
    res.render("createTask");
});
router.post("/create", TaskController.createTask);
router.get("/", TaskController.getAllTasks);
router.get("/mytask", TaskController.getMyTask);
router.post("/update/:id",  TaskController.updateTask);
router.get("/delete/:id", TaskController.deleteTask);

module.exports = router;
