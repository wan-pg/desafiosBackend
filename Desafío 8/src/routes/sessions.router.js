import { Router } from 'express';
import crypto from 'crypto'
import {usuariosModelo} from '../DAO/models/usuarios.modelo.js'

export const router=Router()

//Registrar Usuario nuevo

router.post('/registro',async(req,res)=>{

    let {nombre, email, password}=req.body

    if(!nombre || !email || !password){
        return res.status(400).send('faltan datos')
    }

    let existe=await usuariosModelo.findOne({email})
    if(existe){
        return res.status(400).send(`Usuario ya está registrado: ${email}`)
    }

    password=crypto.createHmac('sha256','palabraSecreta').update(password).digest('base64')

    await usuariosModelo.create({
        nombre, email, password
    })

    res.redirect(`/?usuarioCreado=${email}`)
})

// Logearse en el sitio

router.post('/login',async(req,res)=>{
    console.log("hola")

    let {email, password}=req.body

    if(!email || !password) {
        return res.send('faltan datos')
    }

    password=crypto.createHmac('sha256','palabraSecreta').update(password).digest('base64')

    let usuario=await usuariosModelo.findOne({email, password})
    if(!usuario){
        return res.status(401).send('credenciales incorrectas')
    }

    req.session.usuario={
        nombre: usuario.nombre,
        email: usuario.email
    }

    res.redirect('/api/products')

    
});


// Cerrar Sesión
router.get('/logout',(req,res)=>{

    req.session.destroy(e=>console.log(e))

    res.redirect('/?mensaje=logout correcto...!!!')

});
