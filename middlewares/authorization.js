"use strict";

const TaskRepository = require("../models").Task;
const UserRepository = require("../models").User;

const taskAuthorization = async (req, res, next) => {
  try {
    const userId = req.session.id;

    await TaskRepository.findByPk(req.params.id).then((result) => {
      if (result === null) throw new Error("task not found");
      if (result.user_id !== userId) throw new Error("not authorized");
    });
    
    next();
  } catch (error) {
    if (error.message === "not authorized")
      res.render("error", {
        message: error.message,
        status: 403,
        backlink: "/task",
      });
      next({ status: 403, message: error.message });
    if (error.message === "task not found")
      res.render("error", {
        message: error.message,
        status: 404,
        backlink: "/task",
      });
      next({ status: 404, message: error.message });
  }
};

const userAuthorization = async (req, res, next) => {
  try {
    const userId = req.session.id;

    await UserRepository.findByPk(req.params.id).then((result) => {
      if (result.id === userId) {
        next()
      } 
      else {
        throw new Error(`not authorized`);
      }
    });
  } catch (error) {
      res.render("error", {
        message: error.message,
        status: 403,
        backlink: "/user",
      });
      return next({ status: 403, message: error.message })
    }
    
    
};

module.exports = {taskAuthorization, userAuthorization};
