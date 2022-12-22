const express=require("express");
const {NoteModel}=require("../models/note.model")
const {Authentication}=require("../middleware/Auth.middleware")



const app=express.Router();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(Authentication)

app.get("/",async(req,res)=>{
    const notes= await NoteModel.find();
    res.send({"msg":"notes",notes,body:req.body})
})

app.post("/create",async(req,res)=>{
     try {
        const note=await new NoteModel(req.body);
        note.save()
        res.send({"msg":"notecreated successfully",note})
     } catch (error) {
        res.send({"err" : "Something went wrong while crating note"})
     }
})

app.patch("/update/:noteID",async(req,res)=>{
    const noteID=req.params.noteID;
    const userID=req.body.userID;
    try {
        const note=await NoteModel.findById({_id:noteID});
        // console.log(note)
        if(note.userID==userID){
           await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
           res.send({"msg" : "Note updated successfully"})
        }else{
            res.send("you can't update others note")
        }
    } catch (error) {
        res.send("error in update :"+error)
    }

})

app.delete("/delete/:noteID",async(req,res)=>{
    const noteID=req.params.noteID;
    const userID=req.body.userID;
    try {
        const note=await NoteModel.findById({_id:noteID});
        // console.log(note)
        if(note.userID==userID){
           await NoteModel.findByIdAndDelete({_id:noteID})
           res.send({"msg" : "Note deleted successfully"})
        }else{
            res.send("you can't delete others note")
        }
    } catch (error) {
        res.send("error in update :"+error)
    }

})

module.exports=app;


