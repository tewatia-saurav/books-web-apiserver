const userController = require("../controller/userController");

var express = require("express");

const userRouter = express.Router();

userRouter.post("/signup", userController.signup);

userRouter.post("/login", userController.login);

// userRouter.get('/getusers',userController.authorize, userController.getUser)

module.exports = userRouter;
