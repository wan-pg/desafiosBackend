import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';
import mongoose from 'mongoose';
import { router as productsRouter } from './routes/products.router.js';
import { router as cartsRouter } from './routes/carts.router.js';
import {Server} from 'socket.io'

import {chatsModelo} from './DAO/models/chat.modelo.js'
import { promises } from 'dns';



const PORT=3000;

const app=express();

app.engine('handlebars', engine({
runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
},
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'./views'));


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'./public')));


app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);

app.get('/chat',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).render('chat');
})

let usuarios=[]
console.log(usuarios)

//endpoint chat
 app.post('/api/chat',async(req,res)=>{

    let nuevoUsuario
    try {
       nuevoUsuario =   await Promise.all(usuarios.map(async usuario=>{
         chatsModelo.create({
            user: usuario.nombre
        })
        console.log(typeof(nuevoUsuario),nuevoUsuario)
      }))

  return  res.status(201).json({ mensaje: 'Usuarios creados correctamente', nuevoUsuario });
    
} catch (error) {
    console.error(error);
        res.status(500).json({ error: 'Error al crear los usuarios', detalle: error.message });
}
    
}) 

//Servidor express
const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});


//servidor chat
let mensajes=[{
    emisor:'Server',
    mensaje:'Bienvenido al chat...!!!'
}]

const io=new Server(server)
io.on('connection',socket=>{
    console.log(`Se ha conectado usuario ${socket.id}`)

    socket.on('id', nombre=>{
        console.log(nombre)

        usuarios.push({
            id: socket.id,
            nombre
        })
console.log(usuarios)
        socket.emit('bienvenida', mensajes)

        socket.broadcast.emit('nuevoUsuario', nombre)
})
socket.on('nuevoMensaje',mensaje=>{
    mensajes.push(mensaje)

    io.emit('llegoMensaje', mensaje) //manda mensaje a todos
})

})


//conexión con atlas
try {
    await mongoose.connect('mongodb+srv://wanpg:Wanpg831206@cluster0.99iqfix.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp&dbName=ecommerce')
    console.log('DB Conectada')
} catch (error) {
    console.log(error.message)    
}
