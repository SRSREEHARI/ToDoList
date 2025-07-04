import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./database/db.js";
import { Todo } from "./models/todoModel.js";
 
//middleware

app.use(express.json());

const PORT = 5000;
connectDB();
//Todo APIs
app.get("/", async (req, res) => {
  try {
    const result = await Todo.find();
    res.send({
      success: true,
      message: "Todo GET API is working fine",
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Todo GET API is not working ",
      data: error,
    });
  }
});

app.post("/create", async (req, res) => {
  const todoDetails = req.body
  try {
   const data = await Todo.create(todoDetails);
   res.send({
    success: true,
    message: "Todo POST API is working ,todo created successfully",
   })
  }catch(error){
    res.send({
      success: false,
      message: "Todo POST API is not working ,todo is not created ",
      data: error
      })
  }
})


app.get("/todoId",async(req,res)=>{
const todoId =req.params.todoId;
try{
  const result = await Todo.findById(todoId);
  res.send({
    success: true,
    message: "Todo is retrieved successfully",
    data: result,
    });
    }catch(error){
      res.send({
        success: false,
        message: "Failed to retrieve the todo ",
        data: error,
        })
      }
      })

      app.patch("/update/:todoID",(req,res)=>
    {
      const todoID = req.params.todoID;
      const updateTodo = req.body;
      try{
        const result = awaitTodo.findByIdAndUpdate(todoID,updateTodo,{new:true});
          res.send({
            success: true,
            message: "Todo is updated successfully",
            data: result,
            })
            }catch(error){
              res.send({
                success: false,
                message: "Failed to update the todo ",
                data: error,
                })
              }
        })
app.delete("/delete/:todoId", async (req ,res)=>{
  const todoId = req.params.todoId;
  try{
     await Todo.findByIdAndDelete(todoId);
     res.send({
      success: true,
      message: "Todo is deleted successfully",
      data: "",
      })
  }catch (error){
    res.send({
      success: false,
      message: "Failed to delete the todo ",
      data: error,
      })
      }
      })         


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
