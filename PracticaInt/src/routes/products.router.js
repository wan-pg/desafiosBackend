import { Router } from "express";
import mongoose from "mongoose";
import { productosModelo } from "../DAO/models/productos.modelo.js";

export const router = Router()


//Mostrar Productos
router.get('/',async(req,res)=>{    
    let productos=await productosModelo.find()

    res.status(200).json({
        productos
    })
})

//Crear producto nuevo
router.post('/',async(req,res)=>{    
    
    let producto = req.body     
    
    //traer producto
    let existe = await productosModelo.findOne({_id: producto._id})
    if(existe) return res.status(400).json({error:`Producto con _id ${producto._id} ya existe`})  
    

    try {
        let nuevoProducto = await productosModelo.create(producto)
        res.status(201).json({nuevoProducto})
    } catch (error) {
        res.status(500).json({error:'Error inesperado', detalle:error.message})
    }
})


//modificar producto

router.put('/:id',async(req, res)=>{

    let id=req.params.id
    //verificar id válido
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({error:'id invalido'})

    let modifica=req.body
    if(!modifica.title && !modifica.description && !modifica.price && !modifica.code && !modifica.stock) return res.status(400).json({error:'Seleccione una propiedad para modificar'})


    let existe=await productosModelo.findById(id)
    console.log(existe)

    if(!existe) return res.status(404).json({error:`producto con id ${id} inexistente`})

    let resultado=await productosModelo.updateOne({_id:id}, modifica)    
    res.status(200).json({resultado})

})

//Eliminar Producto por id

router.delete('/:id',async(req, res)=>{
    let id=req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({error:'id invalido'})

    let existe=await productosModelo.findById(id) 
    if(!existe) return res.status(404).json({error:`producto con id ${id} inexistente`})

    let resultado=await productosModelo.deleteOne({_id:id})
    res.status(200).json({resultado})

})
