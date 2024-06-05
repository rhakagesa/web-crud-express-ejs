"use strict";

const TaskService = require("../services/taskService");
const UserService = require("../services/userService");

module.exports = class TaskController {
  static async createTask(req, res, next) {
    const data = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || false,
      user_id: req.session.id,
    };
    try {
      await TaskService.createTask(data).then((result) => {
        res.status(201).redirect("/task/mytask");
      });
    } catch (error) {
      next({ message: error.message, status: 404, backlink: "/task/create" });
    }
  }

  static async getAllTasks(req, res, next) {
    try {
      const user = await UserService.findAllUsers();
      await TaskService.getAllTask().then((result) => {
        res.status(200).render("tasks", {
          task: result,
          user,
        });
      });
    } catch (error) {
      next({ message: error.message, status: 404, backlink: "/user/info"})
    }
  }

  static async getMyTask(req, res, next) {
    try {
      const user = await UserService.findAllUsers();
      await TaskService.getMyTask(req.session.id).then((result) => {
        res.status(200).render("task", {
          task: result,
          user,
        });
      });
    } catch (error) {
      next({ message: error.message, status: 404, backlink: "/user/info"})
  }
  }

  static async updateTask(req, res, next) {
    const data = {
      id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || false,
      user_id: req.session.id,
    };

    try {
      await TaskService.updateTask(data).then((result) => {
        res.status(200).redirect("/task/mytask");
      });
    } catch (error) {
      next({ message: error.message, status: 404, backlink: "/task" });
    }
  }

  static async deleteTask(req, res, next) {
    const id = req.params.id;
    try {
      await TaskService.deleteTask(id).then((result) => {
        res.status(200).redirect("/task/mytask");
      });
    } catch (error) {
      next({ message: error.message, status: 404, backlink: "/task", });
    }
  }
};
