import mongoose from "mongoose";

const chatsColeccion = 'message'
const messageEsquema = new mongoose.Schema({
    user:String,
    message: String  
   
},{strict:false})

export const chatsModelo = mongoose.model(chatsColeccion, messageEsquema)