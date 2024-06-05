"use strict";

const UserService = require("../services/userService");

module.exports = class UserController {
  static async getAllUsers(req, res, next) {
    try {
      await UserService.findAllUsers().then((result) => {
        res.status(200).render("users",{users: result, loggedInId: req.session.id});
      });
    } catch (error) {
      next({ message: error.message, status: 404, backlink: "/users"})
    }
  }

  static async getUser(req, res, next) {
    await UserService.findUser(req.session.id)
      .then((result) => {
        res.status(200).render("user", {
          user: {
            id: req.session.id,
            name: result.name,
            email: result.email,
            password: result.password,
          },
        });
      })
      .catch((error) => {
       next({ message: error.message, status: 404, backlink: "/user"})
      });
  }

  static async updateUser(req, res, next) {
    const data = {
      id: req.session.id,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    try {
      await UserService.update(data).then((result) => {
        res.status(200).render("user", { user: {
          id: result.id,
          name: result.name,
          email: result.email,
          password: result.password,
        }, message: "user updated successfully" });
      });
    } catch (error) {
      next({ message: error.message, status: 404, backlink: "/user" })  
    }
  }

  static async deleteUser(req, res, next) {
    await UserService.delete(req.session.id)
      .then((result) => {
        res.status(200).render("index", { message: "user deleted successfully" });
      })
      .catch((error) => {
        next({ message: error.message, status: 404, backlink: "/user"})
      });
  }
};
