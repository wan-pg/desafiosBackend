import { Router } from "express";
import { productos } from "../data/productos.js";
export const router=Router()



router.get('/',(req,res)=>{   
    
    res.setHeader('Content-Type','text/html');
    res.status(200).render('realTimeProducts')
    
   
});
