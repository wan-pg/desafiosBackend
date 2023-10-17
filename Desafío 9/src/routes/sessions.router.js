import { Router } from 'express';
import crypto from 'crypto'
import {usuariosModelo} from '../DAO/models/usuarios.modelo.js'
import passport from 'passport';

export const router=Router()


//Error de registro passport
router.get('/errorRegistro',(req,res)=>{
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        error:'Error de registro'
    });
});


//Registrar Usuario nuevo

router.post('/registro',passport.authenticate('registro',{failureRedirect: '/api/sessions/errorRegistro'}),async(req,res)=>{

    let {nombre, email, password}=req.body
    res.redirect(`/?usuarioCreado=${email}`)
    
})

// Logearse en el sitio

router.post('/login',passport.authenticate('login',{failureRedirect: '/api/sessions/errorLogin'}),async(req,res)=>{

    console.log(req.user)
    req.session.usuario= req.user
    
    res.redirect('/api/products')

    
});

router.get('/errorLogin',(req,res)=>{
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        error:'Error Login'
    });
});


// Cerrar Sesión
router.get('/logout',(req,res)=>{

    req.session.destroy(e=>console.log(e))

    res.redirect('/?mensaje=logout correcto...!!!')

});
