"use strict";

const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/taskController");
const {taskAuthorization} = require("../middlewares/authorization");
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.get("/create", (req, res) => {
    res.render("createTask");
});
router.post("/create", TaskController.createTask);
router.get("/", TaskController.getAllTasks);
router.get("/mytask", TaskController.getMyTask);
router.post("/update/:id", taskAuthorization, TaskController.updateTask);
router.get("/delete/:id", taskAuthorization, TaskController.deleteTask);

module.exports = router;
