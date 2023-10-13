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
    if(existe) return res.status(400).json({error:`Cart con _id ${_id} ya existe`})  
    

    try {
        let nuevoCart = await cartsModelo.create({cart})
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
    
    let cartBuscado=await cartsModelo.findById(cid).lean()
                            .populate('products.producto')
                            console.log(JSON.stringify(cartBuscado,null,5))
    
    if(!cartBuscado) return res.status(400).json({error:`cart con _id ${cid} no existe`})
    
    res.status(200).render('cartId',
    {cartBuscado}
    )
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
    //console.log(cartEncontrado)

    //verificar si el producto existe
    let productoEncontrado=await productosModelo.findById(pid) 
    if(!productoEncontrado) return res.status(404).json({error:`producto con id ${pid} inexistente`})

    // Verificar si el producto ya está en el carrito
    const existingProduct = cartEncontrado.products.findIndex(product => product.producto.toString() === pid);
    
    if (existingProduct !== -1) {
        // Si el producto ya está en el carrito, incrementar la cantidad en 1
        let cartActulizado = await cartsModelo.updateOne(
            {_id:cid,'products.producto': pid},
            {$inc:{'products.$.quantity': 1}}
            
        )
        
        res.status(200).json({ message: 'Producto agregado al carrito exitosamente',cartActulizado })
    }else{
        // Si no se modificó ningún documento, significa que el producto no estaba en el carrito
        let cartActulizado = await cartsModelo.updateOne(
        { _id: cid },
        {
          $push: {products: {
              producto: pid,
              quantity: 1
            }
          }
        }
      )
      
        res.status(200).json({ message: 'Producto agregado al carrito exitosamente',cartActulizado });

    }     

})


//Eliminar producto seleccionado del carrito
router.delete('/:cid/product/:pid', async (req,res)=>{
    let {cid, pid} = req.params

    //verificar cid válido
    if(!mongoose.Types.ObjectId.isValid(cid)) return res.status(400).json({error:'id invalido'})

    //verificar pid válido
    if(!mongoose.Types.ObjectId.isValid(pid)) return res.status(400).json({error:'id invalido'})   

//traer el carrito
const cart = await cartsModelo.findById(cid);
if (!cart) {
    return res.status(404).json({ error: `El carrito con id ${cid} no existe` });}
//buscar producto en el carrito
    let productoBuscado = cart.products.findIndex(product => product.producto.toString() === pid);
    if(productoBuscado === -1) return res.status(404).json({ error: `El producto con id ${pid} no existe` })


    let resultado=await  cartsModelo.updateOne(
        { _id: cid },
        { $pull: { products: { producto: pid } } }
      );
    res.status(200).json({resultado})
})


//Eliminar Todos los productos del carrito
router.delete('/:cid', async (req,res)=>{
    let {cid} = req.params

    //verificar cid válido
    if(!mongoose.Types.ObjectId.isValid(cid)) return res.status(400).json({error:'id invalido'})

//traer el carrito
const cart = await cartsModelo.findById(cid);
if (!cart) {
    return res.status(404).json({ error: `El carrito con id ${cid} no existe` });}

    let resultado=await  cartsModelo.updateOne(
        { _id: cid },
        {$set:{products:[]}} // definir el array products como vacío
      );
    res.status(200).json({resultado})
})


//Modificar cantidad de un producto específico

router.put('/:cid/product/:pid', async (req,res)=>{
    let {cid, pid} = req.params
    let {cantidad} = req.body

    //verificar cid válido
    if(!mongoose.Types.ObjectId.isValid(cid)) return res.status(400).json({error:'id invalido'})

    //verificar pid válido
    if(!mongoose.Types.ObjectId.isValid(pid)) return res.status(400).json({error:'id invalido'})   

//traer el carrito
const cart = await cartsModelo.findById(cid);
if (!cart) {
    return res.status(404).json({ error: `El carrito con id ${cid} no existe` });}
//buscar producto en el carrito
    let productoBuscado = cart.products.findIndex(product => product.producto.toString() === pid);
    if(productoBuscado === -1) return res.status(404).json({ error: `El producto con id ${pid} no existe` })


    let resultado=await  cartsModelo.updateOne(
        { _id: cid,'products.producto':pid },
        { $set: { 'products.$.quantity':cantidad } }
      );
    res.status(200).json({resultado})
})

//Modificar todos los productos

router.put('/:cid', async (req,res)=>{
    let {cid} = req.params
    let {productos} = req.body

    //verificar cid válido
    if(!mongoose.Types.ObjectId.isValid(cid)) return res.status(400).json({error:'id invalido'})

//traer el carrito
const cart = await cartsModelo.findById(cid);
if (!cart) {return res.status(404).json({ error: `El carrito con id ${cid} no existe` });}


    let resultado=await  cartsModelo.updateOne(
        { _id: cid},
        { $set: {'products.$[]':productos} }
      );
    res.status(200).json({resultado})
})


