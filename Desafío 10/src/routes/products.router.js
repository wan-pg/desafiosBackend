import { Router } from "express";
import productsController from "../controllers/productsController.js";

export const router=Router()

router.get('/', productsController.getProducts)
router.post('/', productsController.postProducts)





