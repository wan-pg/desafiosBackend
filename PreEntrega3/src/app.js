import express from 'express';
import mongoose from 'mongoose';
import {router as usuariosRouter} from './routes/usuarios.router.js';
import {router as productosRouter} from './routes/products.router.js';
import {router as cartsRouter} from './routes/carts.router.js';
import { config } from './config/config.js';



const PORT=config.server.PORT;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})


//Routes
app.use("/api/usuarios", usuariosRouter)
app.use("/api/products", productosRouter)
app.use("/api/carts", cartsRouter)



const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

//conexión con atlas
try {
    mongoose.connect(config.database.MONGO_URL,{
        dbName:config.database.DB_NAME
    })
    console.log('DB online...!!!')
} catch (error) {
    console.log(error.message)
    process.exit()
}
