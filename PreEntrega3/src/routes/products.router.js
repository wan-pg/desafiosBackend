import { Router } from "express";
import { getProductos,getProductosById,createProducto,updateProducto, deleteProducto } from "../controllers/productsController.js";

export const router=Router()

router.get('/', getProductos) //Traer todos los productos
router.get('/:id', getProductosById) //Traer producto por ID
router.post('/', createProducto) //Crear nuevo Producto
router.put('/:id', updateProducto) // Actualizar producto
router.delete('/:id', deleteProducto) // Borrar producto







