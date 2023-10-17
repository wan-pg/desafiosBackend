import { Router } from "express";
import mongoose from "mongoose";
import { productosModelo } from "../DAO/models/productos.modelo.js";
import { cartsModelo } from "../DAO/models/carts.modelo.js";
import { usuariosModelo } from "../DAO/models/usuarios.modelo.js";

export const router = Router()


//Mostrar Productos
router.get('/',async(req,res)=>{ 
//obtener cid para vincularlo al enlace
    //obetner el cart - para porder obtener el cid y poder  hacer un link 
    // al la vista de carrito
    let cart = await cartsModelo.findOne().lean()
    let cid = cart._id   
    
       
    let nombre = req.user.nombre
    let email = req.user.email
    
    

    let addCartBtn =false

    if(email === 'adminCoder@coder.com'){
        addCartBtn = true
    } 
    console.log(addCartBtn)
    
    let pagina = req.query.pagina
    if(!pagina) pagina = 1

    let limite = req.query.limite
    let totalProductos = await productosModelo.countDocuments(); //contar productos en la base de datos para establecer límite dinámico
    if(!limite) limite = totalProductos
    
   
    let categoria = req.query.categoria 
    let filtro = {'category': `${categoria}`}  // filtro categoría
    if(!categoria) filtro = ''
    
    let productos = await productosModelo.paginate(filtro, { limit: limite, lean: true, page: pagina, sort:{price:1} });
   
                
//paginación

  let{
    totalPages,
    hasPrevPage,
    hasNextPage,
    prevPage,
    limit,
    nextPage    
  } = productos
  
      res.setHeader('Content-Type', 'text/html');
      res.status(200).render('products',{productos: productos.docs,
          totalPages,
          hasPrevPage,
          hasNextPage,
          prevPage,
          limit,
          nextPage,
          cid:cid,
          nombre,
          addCartBtn
                   
      }
          
      )   
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

// traer producto por id y  mostrar detalles
router.get('/detalle/:id',async(req, res)=>{

    let id=req.params.id
    console.log(id)
    //verificar id válido
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({error:'id invalido'}) // verificar si es un id válido

    let producto =await productosModelo.findById(id).lean()
    

    if(!producto) return res.status(404).json({error:`producto con id ${id} inexistente`})  
    res.status(200).render('productDetail',{producto})

})

