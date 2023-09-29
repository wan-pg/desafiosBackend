import { Router } from "express";
import mongoose from "mongoose";
import { cartsModelo } from "../DAO/models/carts.modelo.js";
import { productosModelo } from "../DAO/models/productos.modelo.js";

export const router = Router()

//crear cart
router.post('/', async(req, res)=>{
    
    let cart = req.body

    //Verificar Cart
    let existe = await cartsModelo.findOne({ _id: cart._id });
    if(existe) return res.status(400).json({error:`Cart con _id ${cart._id} ya existe`})  
    

    try {
        let nuevoCart = await cartsModelo.create(cart)
        res.status(201).json({nuevoCart})
    } catch (error) {
        res.status(500).json({error:'Error inesperado', detalle:error.message})
    }
})

//Obtener carro a partir del id

router.get('/:cid',async(req,res)=>{ 

    let cid=req.params.cid

    //verificar id válido
    if(!mongoose.Types.ObjectId.isValid(cid)) return res.status(400).json({error:'id invalido'})
    
    let cartBuscado=await cartsModelo.findById(cid)
    if(!cartBuscado) return res.status(400).json({error:`cart con _id ${cid} no existe`})

    res.status(200).json({
        cartBuscado
    })
})

//Agregar producto al carro

router.post('/:cid/product/:pid', async (req,res)=>{
    let {cid, pid} = req.params

    //verificar cid válido
    if(!mongoose.Types.ObjectId.isValid(cid)) return res.status(400).json({error:'id invalido'})

    //verificar pid válido
    if(!mongoose.Types.ObjectId.isValid(pid)) return res.status(400).json({error:'id invalido'})

    //verificar si el cart existe
    let cartEncontrado=await cartsModelo.findById(cid) 
    if(!cartEncontrado) return res.status(404).json({error:`Cart con id ${cid} inexistente`})

    //verificar si el producto existe
    let productoEncontrado=await productosModelo.findById(pid) 
    if(!productoEncontrado) return res.status(404).json({error:`producto con id ${pid} inexistente`})

    let existe = cartEncontrado.products.find(producto =>producto.productId === productoEncontrado._id )
    if(existe){
        let cartActualizado = await cartsModelo.updateOne({_id: cid},    
            {$push:{products:{productId: productoEncontrado._id, quantity:1}}})
            return res.status(200).json({cartActualizado})
    }else{
        let cartActualizado = await cartsModelo.updateOne({ _id: cid, 'products.productId': productoEncontrado._id },
        { $inc: { 'products.$.quantity': 1 } } )
        return res.status(200).json({cartActualizado})
        
    }
    
   
})
