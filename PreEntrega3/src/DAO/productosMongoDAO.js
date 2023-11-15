import mongoose from "mongoose";
import { productosModelo } from "./models/productos.modelo.js";


export class ProductosMongoDAO{
    async get(){
        return await productosModelo.find()
    }

    async getById(id){
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error("Id de Mongo inválido")
        }
        return await productosModelo.findOne({_id:id})
    }

    async create(producto){
        console.log(producto)
        return await productosModelo.create(producto)
    }

    async update(id, producto){
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error("Id de Mongo inválido")
        }
        return await productosModelo.updateOne({_id:id}, producto)
    }

    async delete(id){
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error("Id de Mongo inválido")
        }
        return await productosModelo.deleteOne({_id:id})
    }

}