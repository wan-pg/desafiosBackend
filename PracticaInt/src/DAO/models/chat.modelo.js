import mongoose from "mongoose";

const chatsColeccion = 'chats'
const chatsEsquema = new mongoose.Schema({
    user:String,
    message: String  
   
},{strict:false})

export const cartsModelo = mongoose.model(chatsColeccion, chatsEsquema)