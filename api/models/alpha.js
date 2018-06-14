const mongoose = require("mongoose"); 

const alphaSchema = mongoose.Schema({ 
    _id: mongoose.Schema.Types.ObjectId,
    fullname: String, 
    age: Number, 
    abillity: String, 
    illness: String, 
    image: { type: String, required: false } 
}); 

module.exports = mongoose.model("Alpha", alphaSchema); 
