import mongoose from "mongoose";

const cartsColeccion = 'carts'
const cartsEsquema = new mongoose.Schema({
    products:{
        type:[
            {
                producto:{
                    type:mongoose.Schema.Types.ObjectId, //hace refernecia al object id de otra colección (_id del prodcuto)
                    ref: 'productos'
                },
                quantity:Number                 
            }            
        ]
    }
      
      
   
},{strict:false})


export const cartsModelo = mongoose.model(cartsColeccion, cartsEsquema)