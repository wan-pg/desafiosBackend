import { Router } from 'express';
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

router.post('/registro',function(req, res, next) {
    passport.authenticate('registro', function(err, user, info, status) {
      if (err) { return next(err) }
      if (!user) { return res.redirect(`/registro?error=${info.message?info.message:info.toString()}`) }
    //   res.redirect('/account');
        req.user=user
        return next()
    })(req, res, next);
  } ,(req,res)=>{

    res.status(200).redirect(`/?mensaje=Usuario ${req.user.nombre} registrado correctamente. Username: ${req.user.email}`)
})

// Logearse en el sitio

router.post('/login', function(req, res, next) {
    passport.authenticate('login', function(err, user, info, status) {
      if (err) { return next(err) }
      if (!user) { return res.redirect(`/login?error=${info.message?info.message:info.toString()}`) }
    //   res.redirect('/account');
        req.user=user
        return next()
    })(req, res, next);
  } ,(req,res)=>{

    res.status(200).redirect(`/api/products?mensaje=Usuario ${req.user.nombre} logueado correctamente. Rol: ${req.user.rol}`)
})

/* router.post('/login',passport.authenticate('login',{failureRedirect: '/api/sessions/errorLogin'}),async(req,res)=>{

    console.log(req.user)
    req.session.usuario= req.user
    
    res.redirect('/api/products')

    
});

router.get('/errorLogin',(req,res)=>{
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        error:'Error Login'
    });
}); */


// Cerrar Sesión
router.get('/logout',(req,res)=>{

    req.session.destroy(e=>console.log(e))

    res.redirect('/?mensaje=logout correcto...!!!')

});
