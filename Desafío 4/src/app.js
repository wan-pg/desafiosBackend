import express from 'express';
import handlebars from 'express-handlebars'
import __dirname from './utils.js';
import {router as vistasRouter} from './routes/views.router.js';
import { productos } from './data/productos.js';
import { Server } from 'socket.io';
import path from 'path';


const PORT=3000;
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars',handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname,'/public')));
console.log(path.join(__dirname,'/public'))


app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).render('index',{productos});
})

app.use('/realtimeproducts',vistasRouter)




const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

const serverSocket = new Server(server)

serverSocket.on('connection', socket=>{
    console.log('cliente conectado')

    socket.emit('productos',productos);
})




