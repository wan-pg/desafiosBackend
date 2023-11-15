import mongoose from "mongoose";
import { cartsModelo } from "./models/carts.modelo.js";


export class CartsMongoDao{
    async create(cart){

        console.log(cart)
        return await cartsModelo.create(cart)
        
    }

    async get(){
        return await productosModelo.find()
    }

    async getById(id){

        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error("Id de Mongo inválido")
        }
        return await cartsModelo.findOne({_id:id})

    }

    async update(id){
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error("Id de Mongo inválido")
        }
        return await cartsModelo.updateOne({_id:id})

    }

}