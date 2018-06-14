const express = require("express"); 
const app = express(); 
const bodyParser = require("body-parser"); 
const mongoose = require("mongoose"); 

/// Import Routes 
const alphaRoutes = require("./api/routes/alphas"); 
const userRoutes = require("./api/routes/user"); 

/// Connect to Database 
const private = require("./private"); 
mongoose.connect(private.databaseConnectionString); 
mongoose.Promise = global.Promise;

/// Middleware 
app.use("/uploads", express.static("uploads")); 
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json()); 
app.use((req, res, next) => { // Cross-Origin 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, "); 
    if (req.method === "OPTIONS") { 
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET"); 
        return res.status(200).json({}); 
    } 
    next(); 
}); 


/// Route Handling 
app.use("/alphas", alphaRoutes); 
app.use("/user", userRoutes); 

/// Error handling 
app.use((req, res, next) => { 
    const error = new Error("This resource was not found"); 
    error.status = 404; 
    next(error); 
}); 
app.use((error, req, res, next) => { 
    res.status(error.status || 500); 
    res.json({ 
        error: { 
            message: error.message 
        }
    }); 
}); 

module.exports = app; 