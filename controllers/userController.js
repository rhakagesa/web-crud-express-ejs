"use strict";

const UserRepository = require("../models/").User;
const TaskRepository = require("../models").Task;

const { hashPassword } = require("../helpers/bcrypt");

module.exports = class UserController {
  static async getAllUsers(req, res, next) {
    try {
      await UserRepository.findAll().then((result) => {
        res.status(200).render("users",{users: result, loggedInId: req.session.userId});
      });
    } catch (error) {
      next({ message: error.message, status: 404, backlink: "/users"})
    }
  }

  static async getUser(req, res, next) {
    await UserRepository.findByPk(req.session.userId)
      .then((result) => {
        res.status(200).render("user", {
          user: {
            id: req.session.userId,
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
      id: req.params.id,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    try {
        await UserRepository.findByPk(data.id).then((user) => {
          data.password = hashPassword(data.password);
          user.update(data)
             
          res.status(200).redirect("/user");
        });        
    } catch (error) {
      next({ message: error.message, status: 404, backlink: "/user" })  
    }
  }

  static async deleteUser(req, res, next) {

    try{
      
      if(Number(req.params.id) === req.session.userId) {
        await UserRepository.destroy({ where: { id: req.params.id } }).then((user) => {
          TaskRepository.destroy({ where: { user_id: req.params.id } })
          req.session.destroy()
          res.status(200).redirect("/")
        })
      } else {
        await UserRepository.destroy({ where: { id: req.params.id } }).then((user) => {
          TaskRepository.destroy({ where: { user_id: req.params.id } })
          res.status(200).redirect("/user")
        })
      }
       
      } catch (error) {
        next({ message: error.message, status: 404, backlink: "/user"})
      };
  }
};
