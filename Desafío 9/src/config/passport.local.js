import passport from "passport";
import local from 'passport-local';
import {usuariosModelo} from '../DAO/models/usuarios.modelo.js';
import { generaHash, validaHash } from "../utils.js";
import { router } from "../routes/sessions.router.js";

export const inicializaPassport = ()=>{
    passport.use('registro', new local.Strategy(
        {
            usernameField: 'email', passReqToCallback:true
        },
       async (req,username,password,done)=>{
            try {
                let {nombre, email, password}=req.body

                if(!nombre || !email || !password){
                    done(null,false)
                }

                let existe=await usuariosModelo.findOne({email})
                if(existe){
                    done(null,false)
                }                

                let usuario = await usuariosModelo.create({
                    nombre, email, 
                    password: generaHash(password)
                })

                done(null,usuario)
                            
            } catch (error) {
                done(error)
            }

        }
    ))

    //login con passport

    passport.use('login', new local.Strategy(
        {
            usernameField:'email'
        },
        async(username,password,done)=>{
            try {
                if(!username || !password) {
                     return done(null,false)
                }
                                        
                let usuario=await usuariosModelo.findOne({email:username})
                if(!usuario){
                    return done(null,false)
                }else{
                    if(!validaHash(usuario, password)){
                        // clave invalida
                        return done(null, false)
                    }
                }
                usuario={
                    nombre: usuario.nombre, 
                    email: usuario.email, 
                    _id: usuario._id
                }

                return done(null,usuario)
                
            } catch (error) {
                 return done(error)
            }

        }
    ))

     // serialize y deserialize
     passport.serializeUser((ususario, done)=>{
        return done(null, ususario._id)
    })

    passport.deserializeUser(async(id, done)=>{
        let usuario=await usuariosModelo.findById(id)
        return done(null, usuario)
    })
}

