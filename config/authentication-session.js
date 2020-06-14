const uuid = require('uuid/v4');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserDao = require('../data/user-dao');
const db = require('../config/database');

module.exports = (app) => {

    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {
            const userDao = new UserDao(db);
            userDao.searchByEmail(email)
                .then(user => {
                    if (!user || password != user.senha) {
                        return done(null, false, {
                            mensagem: 'Login ou senha incorretos'
                        });
                    };
                    return done(null, user);
                })
                .catch(error => done(error, false));
        }
    ));

    passport.serializeUser((user, done) => {
        const sessionUser = {
            name: user.nome,
            email: user.email,
            id: user.idUsuarios
        };

        done(null, sessionUser);
    });

    passport.deserializeUser((sessionUser, done) => {
        done(null, sessionUser);
    });

    app.use(expressSession({
        secret: 'node italo',
        genid: function (require) {
            return uuid();
        },
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(function (require, response, next) {
        require.passport = passport;
        next();
    });



};