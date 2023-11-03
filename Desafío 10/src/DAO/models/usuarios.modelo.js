import mongoose from "mongoose";


const usuariosColeccion = 'usuarios'
const usuariosEsquema = new mongoose.Schema({
    nombre: String,
    apellido:String,
    email: {
        type: String, unique: true
    },
    edad:Number,
    password: String,
    cart:String,
    rol:{
        type: String, default: 'user'
    }
    
},{strict:false})



export const usuariosModelo = mongoose.model(usuariosColeccion, usuariosEsquema)