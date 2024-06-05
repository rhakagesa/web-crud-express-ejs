"use strict";

const AuthService = require("../services/authService");

module.exports = class AuthController {
  static async registerUser(req, res, next) {
    const formData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    try {
      await AuthService.createUser(formData).then((result) => {
        res.status(201).redirect("/auth/login");
      });
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
      await AuthService.loginUser(formData).then((result) => {
        res
          .cookie("jwt", result.token, {
            expire: new Date(Date.now() + 24 * 3600 * 1000),
            httpOnly: true,
          })
          .status(200)
          .render("user",{
            message: "user logged in successfully",
            user: {
              id: result.payload.id,
              name: result.payload.name,
              email: result.payload.email,
            },
          })
      });
    } catch (error) {
     next({ message: error.message, status: 404, backlink: "/auth/login" });
    }
  }

  static async logout(req, res, next) {
    try {
        res
          .clearCookie("jwt")
          .status(200)
          .redirect("/")
    } catch (error) {
      next({ message: error.message, status: 404, backlink: "/" });
    }
  }
};
