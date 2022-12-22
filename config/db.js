const mongoose= require("mongoose")


const conection=mongoose.connect("mongodb://localhost:27017/Authentification")

module.exports={conection};