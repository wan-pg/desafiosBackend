import mongoose from "mongoose";


const usuariosColeccion = 'usuarios'
const usuariosEsquema = new mongoose.Schema({
    nombre: String,
    email: {
        type: String, unique: true
    },
    password: String
    
},{strict:false})



export const usuariosModelo = mongoose.model(usuariosColeccion, usuariosEsquema)