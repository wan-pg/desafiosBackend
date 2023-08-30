const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require ('fs');


let ruta = path.join(__dirname,'..','archivos','productos.json')


function saveProducts(products){
    fs.writeFileSync(ruta, JSON.stringify(products, null, 5))
}

function getProducts(){
    if(fs.existsSync(ruta)){
        return JSON.parse(fs.readFileSync(ruta,'utf-8'))
    }else{
        return []
    }
}

//Crear producto POST

router.post('/',(req,res)=>{

    let {title,description,price,thumbnail,code,stock,status} = req.body

    let products = getProducts()

    let id = 1
    if (products.length >0){
        id = products[products.length - 1].id + 1
    }

    let nuevoProducto = {
        title,
        description,
        price,thumbnail,
        code,
        stock,
        status: true,
        id
        }

    //Verificar code
    if(products.length > 0){
        let codeCheck = products.find(codigo => codigo.code === code)
        if (codeCheck){          
            return res.status(400).json({error: "codigo ya existe"})
            
        }}

    products.push(nuevoProducto)

    saveProducts(products)
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({nuevoProducto});
});


//Mostrar Productos GET
router.get('/',(req,res)=>{

    let products=getProducts()

    let {limit} = req.query
    if(!limit){
        res.status(200).json({data:products});
    }else{
       let resultado =  products.slice(0,limit)
       res.status(200).json({data:resultado});
    }   

    res.setHeader('Content-Type','application/json');
    
})

// Mostrar producto por id
 router.get('/:pid',(req,res)=>{

    let products=getProducts()

    let {pid} = req.params // devuelve id como string
    pid = parseInt(pid)
    

    let resultado = products.filter(producto=>producto.id===pid)
    if (resultado.length>0){
        res.status(200).json({status:'ok', data:resultado})
        }else{
            res.status(400).json({status:'error', mensaje: `El id ${pid} no existe`})
        }
    
    res.setHeader('Content-Type','application/json');
    
 });



//Modificar Producto PUT

router.put('/:pid',(req,res)=>{

    products = getProducts()

    //Busca el producto que se quiere actualizar
    let {pid} = req.params // devuelve id como string
    pid = parseInt(pid)
    
    if(isNaN(pid)){
        return res.status(400).json({error:"el id debe ser numérico"})
    }

    let productoEncontrado = products.find(producto => producto.id === pid)

    //Verificar id
    if (!productoEncontrado){
        res.status(400).json({error:`producto con id ${pid} no existe`})
        return
    }

    //Obtener propiedades
    const { title, description, price, thumbnail, code, stock, status } = req.body;


    //Verificar propiedades
    if(!title && !description && !price && !thumbnail && !code && !stock) {
        return res.status(400).json({error: "Seleccione una propiedad para modificar"})
    }

    if(title){productoEncontrado.title = title}
    if(description){productoEncontrado.description = description}
    if(price){productoEncontrado.price = price}
    if(thumbnail){productoEncontrado.thumbnail = thumbnail}
    if(code){productoEncontrado.code = code}
    if(stock){productoEncontrado.stock = stock}
    

    saveProducts(products)
    res.status(200).json({usuarioModificado:productoEncontrado})  

    //res.setHeader('Content-Type','application/json');
   
});


//Borrar Producto DELETE

router.delete('/:pid',(req,res)=>{

    let products = getProducts()    

    let {pid} = req.params; // devuelve id como string
    pid = parseInt(pid);
    
    if(isNaN(pid)){
        return res.status(400).json({error:"el id debe ser numérico"})
    }

    let productoId = products.filter(producto => producto.id !== pid)

        if (productoId.length === products.length){            
            return res.status(400).json({error: `el producto con ${pid} no existe`})
            }
        saveProducts(productoId)

    res.setHeader('Content-Type','application/json');
    res.status(200).json({status:"ok", mensaje: `el producto con ${pid} fue eliminado`});
});

//Exportar router
module.exports = router;
