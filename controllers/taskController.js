"use strict";

const TaskRepository = require("../models").Task;
const UserRepository = require("../models").User;

module.exports = class TaskController {
  static async createTask(req, res, next) {
    const data = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || false,
      user_id: req.session.userId,
    };
    try {
      if (!data.title || !data.description) {
        throw new Error("title and description are required");
      } else {
        await TaskRepository.create(data).then((result) => {
          res.status(201).redirect("/task/mytask");
        });
      }
    } catch (error) {
      next({ message: error.message, status: 404, backlink: "/task/create" });
    }
  }

  static async getAllTasks(req, res, next) {
    try {
    
      const user = await UserRepository.findAll();
      
      await TaskRepository.findAll().then((result) => {
        if (result.length <= 0) {
          throw new Error("no tasks found");
        } else {
          res.status(200).render("tasks", {
            task: result,
            user,
          });
        }
      });
    } catch (error) {
      next({ message: error.message, status: 404, backlink: "/user/info"})
    }
  }

  static async getMyTask(req, res, next) {
    try {
      const user = await UserRepository.findAll();
      await TaskRepository.findAll({ where: { user_id: req.session.userId || 0} }).then((result) => {
        if (result.length <= 0) {
          throw new Error("no tasks found");
        } else {
          res.status(200).render("task", {
            task: result,
            user,
          }); 
        }
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
      user_id: req.session.userId,
    };

    try {
      if (!data.title || !data.description) {
          throw new Error("title and description are required");
      } else {
          await TaskRepository.update(data, { where: { id: data.id } }).then((result) => {
            res.status(200).redirect("/task/mytask");
          });
      }
    } catch (error) {
      next({ message: error.message, status: 404, backlink: "/task" });
    }
  }

  static async deleteTask(req, res, next) {
    const id = req.params.id;
    try {
      await TaskRepository.destroy({ where: { id } }).then((result) => {
        res.status(200).redirect("/task/mytask");
      });
    } catch (error) {
      next({ message: error.message, status: 404, backlink: "/task", });
    }
  }
};
