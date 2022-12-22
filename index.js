const express=require("express");
const {UserModel}=require("./models/user.model")
const {connection}=require("./config/db");
const mongoose  = require("mongoose");
var jwt = require('jsonwebtoken');
const bcrypt=require("bcrypt")
const notesRouter=require("./Routes/notes.routes")



mongoose.set("strictQuery", false);


const app=express()


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/notes",notesRouter)


app.post("/signup",async(req,res)=>{
   const {email,password}=req.body;
   const userexists= await UserModel.findOne({email});
    if(userexists){
        res.send("email is alredy exists")
    }else{
        try {
            bcrypt.hash(password,2,  async function(err, hash) {
                const user= await new UserModel({...req.body,password:hash})
                user.save()
                res.send(user) 
            });
                
            } catch (error) {
                console.log("error in signup route :"+error)
            }
    }
    
})

app.get("/signupdata",async(req,res)=>{
    const users= await UserModel.find();
    res.send(users)  
 })
 

app.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
    const user= await  UserModel.find({email})
    if(user.length>0){
        bcrypt.compare(password,user[0].password, function(err, result) {
            if(result){
                var token = jwt.sign({ "userID": user[0]._id }, 'soumya');
                res.status(500).send({message:"login successful",token,user})
            }else{
                res.send("login failuer incorect credential 2")
            }
        });
    }else{
        res.send("login failuer incorect credential")
    }
        
    } catch (error) {
        console.log("error in signup route :"+error)
    }
    
})
app.get("/purchage",(req,res)=>{
    const {token}=req.headers;
   // console.log(token)
    var decoded = jwt.verify(token, 'soumya',(err,decoded)=>{
        if(err){
            console.log("wrong token login again :"+err)
        }else if(decoded){
            if(decoded)
           return res.send({msg:"purchaged data",decoded})
        }else{
            console.log("you are in elese part of decoded")
        }
    });
})
app.get("/",(req,res)=>{
   res.send({"msg":"hello soumya"})
})




app.listen(8080,async()=>{
    await connection;
    console.log("db is started")
    console.log("server is started")
})