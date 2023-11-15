import { Router } from "express";
import { getCartsById, createCart, addProducto } from "../controllers/cartsController.js";
export const router=Router()



router.get('/:id', getCartsById)
router.post('/',createCart)
router.post('/:cid/product/:pid', addProducto) // Agregar producto al cart

