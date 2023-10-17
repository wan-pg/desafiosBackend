import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';
import mongoose from 'mongoose';
import session from 'express-session'
import ConnectMongo from 'connect-mongo'
import { inicializaPassport } from './config/passport.local.js';
import passport from 'passport';

import { router as productsRouter } from './routes/products.router.js';
import { router as cartsRouter } from './routes/carts.router.js';
import { router as vistasRouter } from './routes/vistas.router.js';
import { router as sessionsRouter } from './routes/sessions.router.js';


const PORT=3000;

const app=express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'./views'));


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'./public')));

app.use(session({
    secret:'claveSecreta',
    resave:true, saveUninitialized:true,
    store: ConnectMongo.create({
        mongoUrl:'mongodb+srv://wanpg:Wanpg831206@cluster0.99iqfix.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp&dbName=ecommerce',
        ttl: 3600
    })
}))

//midleware passport
inicializaPassport();
app.use(passport.initialize());
app.use(passport.session());


app.use('/', vistasRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);

//Servidor express
const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

//conexión con atlas
try {
    await mongoose.connect('mongodb+srv://wanpg:Wanpg831206@cluster0.99iqfix.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp&dbName=ecommerce')
    console.log('DB Conectada')
} catch (error) {
    console.log(error.message)    
}
