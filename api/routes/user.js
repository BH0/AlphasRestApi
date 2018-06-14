const express = require("express"); 
const router = express.Router(); 
const mongoose = require("mongoose"); 
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken"); 

const private = require("../../private"); 
const User = require("../models/user"); 

const UserController = require("../controllers/user"); 

/// Create User 
router.post("/signup", UserController.user_signup); 

/// Log User In 
router.post("/login", UserController.user_login); 

/// Delete [Remove] User 
router.delete("/:userId", UserController.user_delete); 

module.exports = router; 