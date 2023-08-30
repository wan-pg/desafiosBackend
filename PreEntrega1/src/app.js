const express=require('express');
const PORT=3000;
const app=express();

// importar rutas
const productsRouter = require('./routes/products.router')
const cartsRouter = require('./routes/carts.router')

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Rutas

app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);


app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
