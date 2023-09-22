import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';
import mongoose from 'mongoose';
import { router as productsRouter } from './routes/products.router.js';
import { router as cartsRouter } from './routes/carts.router.js';

const PORT=3000;

const app=express();

app.engine('handlebars', engine({
runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
},
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'../views'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'../public')));

app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);



const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

try {
    await mongoose.connect('mongodb+srv://wanpg:Wanpg831206@cluster0.99iqfix.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp&dbName=ecommerce')
    console.log('DB Conectada')
} catch (error) {
    console.log(error.message)    
}
