import mongoose from "mongoose";
import  mongoosePaginate  from "mongoose-paginate-v2";

const productosColeccion = 'productos'
const productosEsquema = new mongoose.Schema({
    
    title: String,
    description: String,
    price: Number,
    code: Number,
    stock: Number,
    status: Boolean
},{strict:false})

productosEsquema.plugin(mongoosePaginate)

export const productosModelo = mongoose.model(productosColeccion, productosEsquema)