import passport from "passport";
import local from "passport-local";
import passportJWT from "passport-jwt";
import bcrypt from 'bcrypt' 
import { usuariosModelo } from "../DAO/models/usuarios.modelo.js";
import { generaHash, validaHash } from "../utils.js";

export const inicializaPassport = () => {
  passport.use(
    "registro",
    new local.Strategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          let { nombre, email, password } = req.body;

          if (!nombre || !email || !password) {
            return done(null, false, { message: "complete datos" });
          }

          let existe = await usuariosModelo.findOne({ email });
          if (existe) {
            done(null, false, {message:`usuario existente ${username}`});
          }

          let usuario = await usuariosModelo.create({
            nombre,
            email,
            password: bcrypt.hashSync(password,bcrypt.genSaltSync(10)),
          });

          return done(null, usuario);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //login con passport

  passport.use('login', new local.Strategy(
    { usernameField: 'email'},
    async (username, password, done) => {
        try {

            let usuario=await usuariosModelo.findOne({email:username})
            if(!usuario) return done(null, false, {message:`Usuario ${username} inexistente en DB`})
            if(!bcrypt.compareSync(password, usuario.password)) return done(null, false, {message:`Credenciales inválidas`})

            return done(null, usuario)

        } catch (error) {
            return done(error)
        }

    }
)) // fin estrategia login
};
