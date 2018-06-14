/// AlphasController 

const mongoose = require("mongoose"); 
const multer = require("multer"); 

const Alpha = require("../models/alpha");

const rootUrl = "http://localhost:4002/";  

/// Get All Alphas 
module.exports.alphas_get_all = (req, res, next) => { 
    console.log("User requested get all"); 
    // Alpha.find().limit(10).exec().then(docs => { 
    Alpha.find().select("fullname age abillity illness image _id").exec().then(docs => { 
        const response = { 
            count: docs.length, 
            alphas: docs.map(doc => { 
                return { 
                    fullname: doc.fullname, 
                    age: doc.age, 
                    abillity: doc.abillity, 
                    illness: doc.illness, 
                    image: doc.image, 
                    _id: doc._id, 
                    request: { 
                        type: "GET", 
                        url: rootUrl + "alphas/" + doc._id
                    } 
                }
            }) 
        } 
        res.status(200).json(response); 
    }).catch(err => { 
        res.status(500).json({error: err}); 
    });  
} 

/// Get ALpha By ID 
module.exports.alphas_get_by_id = (req, res, next) => { 
    console.log("User requested get by ID"); 
    const id = req.params.alphaId; 
    Alpha.findById(id).exec().then(doc => { 
        if (doc) { 
            res.status(200).json(doc);         
        } else { 
            res.status(404).json({message: "The alpha you requested does not exist"}); 
        }
    }).catch(err => { 
        res.status(500).json({error: err}); 
    }); 
} 

/// Post Alpha 
module.exports.alpha_create_alpha =  (req, res, next) => { 
    console.log("User posted an Alpha");  
    const alpha = new Alpha({ 
        _id: new mongoose.Types.ObjectId,
        fullname: req.body.fullname, 
        age: req.body.age, 
        abillity: req.body.abillity, 
        illness: req.body.illness, 
        image: req.file.path 
    }); 
    alpha.save().then(result => { 
        res.status(201).json({ 
            message: "Handling POST requests to /alphas", 
            createdAlpha: result  
        }); 
    }).catch(err => { 
        res.status(500).json({ 
            error: err 
        }); 
    }); 
} 

/// Update Alpha 
module.exports.alphas_update_alpha = (req, res, next) => {
    console.log("User updated an alpha"); 
    const id = req.params.alphaId; 
    const updateOperations = {};
    for (const operation of req.body) {
        updateOperations[operation.propName] = operation.value;
    } 
    Alpha.update({ _id: id }, { $set: updateOperations }).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
} 

/// Delete Alpha 
module.exports.alphas_delete_alpha = (req, res, next) => { 
    const id = req.params.alphaId;
    Alpha.remove({ _id: id }).exec().then(result => {
        res.status(200).json({
           message: "Alpha deleted",
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
} 
  
