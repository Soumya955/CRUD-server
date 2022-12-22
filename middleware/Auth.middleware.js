const jwt = require("jsonwebtoken");


const Authentication = (req,res,next)=>{
    const token=req.headers?.token.split(" ")[1];
    if(token){
        const decoded = jwt.verify(token ,'soumya',(err,decoded)=>{
            if(decoded){
                req.body.userID = decoded.userID
                next()
            }else if(err){
                res.send(" Incorrect credential Please login again 2")
            }else{
                res.send(" Incorrect credential Please login again 3") 
            }
        })
    }else{
        res.send(" Incorrect credential Please login again")
    }
    
}
module.exports={Authentication}