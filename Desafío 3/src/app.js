const express = require('express')
//exportar archivos con productos
const productos = require("./archivos/productos.json")
//Seleccionar Puerto
const PORT = 3000
//ejecutar módulo express
const app = express()


// listado de productos
app.get('/products',(req, res)=>{
    

    let {limit} = req.query
    if(!limit){
        res.json(productos)
    }else{
       let resultado =  productos.slice(0,limit)
       res.json(resultado)
    }   

})


//Filtrar por id
app.get('/products/:id',(req, res)=>{
    let {id} = req.params // devuelve id como string
    id = parseInt(id)

    let resultado = productos.filter(producto=>producto.id===id)
    if (resultado.length>0){
        res.json({status:'ok', data:resultado})
        }else{
            res.json({status:'error', mensaje: `El id ${id} no existe`})
        }

})

// Error
app.get('*',(req, res)=>{
    res.send('error 404 - page not found')
})

//Hacer que el servidor escuche las peticiones
app.listen(PORT,()=>{
    console.log(`Server corriendo en puerto ${PORT}`)
})