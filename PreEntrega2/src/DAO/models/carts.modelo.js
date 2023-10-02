import mongoose from "mongoose";




const cartsColeccion = 'carts'
const cartsEsquema = new mongoose.Schema({
    products:{
        type:[
            {
                producto:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref: 'productos'
                },
                quantity:Number                 
            }            
        ]
    }
      
      
   
},{strict:false})


export const cartsModelo = mongoose.model(cartsColeccion, cartsEsquema)