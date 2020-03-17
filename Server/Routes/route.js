
const express = require("express");
const router = express.Router(); //can be used in the whole server
const usercontroller = require("../Controller/userController.js");

//calling the POST method for creating a new user
router.post("/register", usercontroller.registerUser);
//calling the POST method for login
router.post("/login", usercontroller.userLogin);

module.exports = router;