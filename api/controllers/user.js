//// UserController 

/// Dependencies  
const mongoose = require("mongoose"); 
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken"); 

const private = require("../../private"); 
const User = require("../models/user"); 

module.exports.user_signup = (req, res, next) => { 
    User.find({ email: req.body.email}).exec().then(user => { 
        if (user.length >= 1) { 
            return res.status(409).json({ 
                message: "This email is already in use" 
            }); 
        } else { 
            bcrypt.hash(req.body.password, private.saltValue, (err, hashedPassword) => { 
                if (err) { 
                    return res.status(500).json({ 
                        error: err  
                    }); 
                } else { 
                    const user = new User({ 
                        _id: mongoose.Types.ObjectId(), 
                        email: req.body.email, 
                        password: hashedPassword
                    });      
                    user.save().then(result => { 
                        res.status(201).json({ 
                            message: "New user created" 
                        }); 
                    }).catch(err => { 
                        res.status(500).json({ 
                            error: err
                        }); 
                    }); 
                } 
            });     
        }
    }); 
} 

module.exports.user_login = (req, res, next) => { 
    User.find({ email: req.body.email }).exec().then(user => { // change to user.findOne 
        if (user.length < 1) { 
            return res.status(401).json({ 
                mesage: "Authentication failed" 
            }); 
        } 
        bcrypt.compare(req.body.password, user[0].password, (err, result) => { 
            if (err) { 
                return res.status(401).json({ 
                    mesage: "Authentication failed" 
                }); 
            } 
            if (result) { 
                const token = jwt.sign({ 
                    emai: user[0].email, 
                    userId: user[0]._id
                }, 
                private.JWT_KEY,
                { 
                    expiresIn: "1h", 
                }                     
                ); 
                return res.status(200).json({ 
                    message: "Authentication succeeded", 
                    token: token 
                }); 
            } 
            return res.status(401).json({ 
                mesage: "Authentication failed" 
            }); 
        }); 
    }).catch(err => { 
        res.status(500).json({ 
            error: err 
        }); 
    }); 
} 

module.exports.user_delete = (req, res, next) => { 
    User.remove({ _id: req.params.userId }).exec().then(result => { 
        res.status(200).json({ 
            message: "User was deleted" 
        }); 
    }).catch(err => { 
        res.status(500).json({ 
            error: err
        }); 
    }); 
} 

