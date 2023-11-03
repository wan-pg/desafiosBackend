import { productosModelo } from "./models/productos.modelo.js";


export class ProductosMongoDAO{
    constructor(){

    }

    //Traer productos
    async get(filtro={}){
        return await productosModelo.find(filtro)
    }

    // Crear producto
    async create(producto){
        return await productosModelo.create(producto)
    }
    // Actualizar producto
    async update(){

    }
    //Eliminar producto
    async delete(){

    }

}