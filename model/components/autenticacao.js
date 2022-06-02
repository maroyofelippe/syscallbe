const LocalStrategy = require('passport-local').Strategy;
const seguranca = require("./seguranca");
const loginBanco = require("../repositories/login/loginDB");
const usuarioBanco = require("../repositories/usuario/usuarioDB");

module.exports = function(passport){
    passport.serializeUser((user, done) => {
        done(null, user.idUsuario);
    });

    passport.deserializeUser(async (id, done) =>{
        try {
            const usuario = await usuarioBanco.getUsuarioId(id);
            done(null, usuario);
        } catch (err) {
            done(err, null);
        }
    });

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'senha',
            session: false
            },

        async (email, senha, done) => {
            try {
                const usuario = await loginBanco.loginUsuario(email, senha);
                if(usuario != null && usuario[0]){
                    return done(null, usuario[0]);
                } else {
                    return done (null, false);
                }
            } catch (err) {
                done(err, false)
            }
        }
    ));
};