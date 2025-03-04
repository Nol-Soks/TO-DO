const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Nol:JV8uM6GgPMia5k4T@cluster0.opn5t.mongodb.net/TodoApplication"); 

const todoSchema = new mongoose.Schema({
    title : String,
    description : String ,
    completed : Boolean
})
const todo = mongoose.model('todos',todoSchema);
module.exports={
    todo: todo
}