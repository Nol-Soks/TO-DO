const express = require("express");
const {createTodo, updateTodo  } = require("./types");
const app = express();
const { todo } = require("./db");



console.log('server started');
app.use(express.json())



app.post("/todo", async function(req, res) {
  
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success){
        res.status(411).json({
            message :" wrong input types"
    })
        return ;
    }

    await todo.create({
        title : createPayload.title ,
        description : createPayload.description,
        completed : false
    })
    res.json({
        msg: "Todo created successfully"
    });

})

app.get("/todos", async function(req, res) {
    const todos = await todo.find({});
    res.json({
        todos
    });
})
app.put("/update", async function(req, res) {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success){
        res.status(411).json({
            msg : "wrong inputs my dear "
        })
        return ;
    }
    
    await todo.findByIdAndUpdate(req.body.id,{
       // completed:req.body.newStatus,
        title : req.body.newTitle,
        description : req.body.newDescription
    })
    res.json({
        msg:"todo is updated"
    });

})


app.delete("/remove",async function (req,res){
    const id = req.body.id;
    await todo.deleteOne({_id : id});
    res.json({
        msg:"todo is deleted"
    });
})
app.put("/completed", async function(req, res) {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success){
        res.status(411).json({
            msg : "wrong inputs dear user"
        })
        return ;
    }
    
    await todo.findByIdAndUpdate(req.body.id,{completed:"true"})
    res.json({
        msg:"todo is completed"
    });

})
app.listen(1327);
