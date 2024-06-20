"use strict";

const UserRepository = require("../models").User;
const { comparePassword } = require("../helpers/bcrypt");

module.exports = class AuthController {
  static async registerUser(req, res, next) {
    const formData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    try {
      if (!formData.name || !formData.email || !formData.password) {
        throw new Error("name, email and password are required");
      } else {
        return await UserRepository.findAll({ where: { email: formData.email } }).then(
          (result) => {
            result.map((user) => {
              if (user.email === formData.email) throw new Error("email already exist");
            });
            UserRepository.create(formData);
            res.status(201).redirect("/auth/login");
          }
        );
      }
    } catch (error) {
      next({ message: error.message, status: 409, backlink: "/auth/register" });
    }
  }

  static async login(req, res, next) {
    const formData = {
      email: req.body.email,
      password: req.body.password,
    };

    try {

      if (!formData.email || !formData.password) throw new Error("email and password are required");

      await UserRepository.findOne({ where: { email: formData.email } }).then(
        (user) => {
          if (user === null) {
            throw new Error("user not found");
          } else {
              if (comparePassword(user.password, formData.password)) {
              
                req.session.user = user.email;
                req.session.userId = user.id;
             
                res.status(200).render("user",{
                  message: "user logged in successfully",
                  user: {
                    id: user.id,
                    name: user.name,
                    email: req.session.user,
                  },
                });
          } else {
            throw new Error("password is incorrect");
          }
        }
      }
    );          
    } catch (error) {
        next({ message: error.message, status: 404, backlink: "/auth/login" });
    }
  }

  static async logout(req, res, next) {
    try {  
        req.session.destroy();
        res.status(200).redirect("/");
    } catch (error) {
      next({ message: error.message, status: 404, backlink: "/" });
    }
  }
};
