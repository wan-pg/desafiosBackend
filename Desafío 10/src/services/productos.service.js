import { ProductosMongoDAO } from "../DAO/productosMongoDAO.js";

class ProductosService{
    constructor(dao){
        this.dao = new dao()
    }

    
}