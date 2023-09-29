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

//cartsEsquema.plugin(mongoosePaginate)

export const cartsModelo = mongoose.model(cartsColeccion, cartsEsquema)