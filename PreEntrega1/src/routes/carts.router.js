const express=require('express');
const router = express.Router();

const path = require('path');
const fs = require ('fs');

let ruta = path.join(__dirname,'..','archivos','productos.json')
let rutaCarts = path.join(__dirname,'..','archivos','carts.json')

function saveProducts(products){
    fs.writeFileSync(ruta, JSON.stringify(products, null, 5))
}

function saveCarts(carts){
    fs.writeFileSync(rutaCarts, JSON.stringify(carts, null, 5))
}

function getProducts(){
    if(fs.existsSync(ruta)){
        return JSON.parse(fs.readFileSync(ruta,'utf-8'))
    }else{
        return []
    }
}

function getCarts(){
    if(fs.existsSync(rutaCarts)){
        return JSON.parse(fs.readFileSync(rutaCarts,'utf-8'))
    }else{
        return []
    }
}

// Crear carro
router.post('/', (req,res)=>{

 let carts = getCarts()
 let products = []


 //cerar id
 let id = 1
    if (carts.length >0){
        id = carts[carts.length - 1].id + 1
    }


 let nuevoCart = {
    id,products
 } 

 carts.push(nuevoCart)

 saveCarts(carts)
 res.setHeader('Content-Type','application/json');
 res.status(200).json({nuevoCart});
})


//Obtener carro a partir del id

router.get('/:cid',(req,res)=>{

    let carts=getCarts()

    let {cid} = req.params // devuelve id como string
    cid = parseInt(cid)
    

    let resultado = carts.filter(carrito=>carrito.id===cid)
    if (resultado.length>0){
        const productosCarrito = resultado[0].products
        res.status(200).json({status:'ok', data:productosCarrito})
        console.log(resultado)
        }else{
            res.status(400).json({status:'error', mensaje: `El id ${cid} no existe`})
        }
    
    res.setHeader('Content-Type','application/json');
    
 });

 // Agregar producto Post

 router.post('/:cid/product/:pid',(req,res)=>{

    let carts = getCarts();
    
    
    let { cid, pid } = req.params;
    cid = parseInt(cid);
    pid = parseInt(pid);

    // verificar si el id de producto existe

    //Buscar Carrito

    let cartEncontrado = carts.find(cart => cart.id === cid)
    if(!cartEncontrado){
         return res.status(400).json({error: `el carro con id ${cid} no existe`})
    }

    // verificar si el producto existe en cart

    let productoEncontrado = cartEncontrado.products.find(item => item.id === pid)

    if(!productoEncontrado){
        cartEncontrado.products.push({id: pid, quantity: 1})
        saveCarts(carts)
        return res.status(200).json({mensaje: 'Producto agregado'})
   }else{
    productoEncontrado.quantity ++
    saveCarts(carts)
    return res.status(200).json({mensaje:'se incrmentó cantidad'})
   }
 })

//Exportar router
module.exports = router;