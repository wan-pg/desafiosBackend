import mongoose from "mongoose";

const productosColeccion = 'productos'
const productosEsquema = new mongoose.Schema({
    
    title: String,
    description: String,
    price: Number,
    code: Number,
    stock: Number,
    status: Boolean
},{strict:false})

export const productosModelo = mongoose.model(productosColeccion, productosEsquema)