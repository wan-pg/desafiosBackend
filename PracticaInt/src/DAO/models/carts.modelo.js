import mongoose from "mongoose";

const cartsColeccion = 'carts'
const cartsEsquema = new mongoose.Schema({
    products: [
        {
            productId : String,
            quantity: Number
        }
    ]   
   
},{strict:false})

export const cartsModelo = mongoose.model(cartsColeccion, cartsEsquema)