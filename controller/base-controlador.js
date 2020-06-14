const ChamadoControlador = require('../controller/chamado-controlador');
const passport = require('passport');

class BaseControlador {

    static routes() {
        return {
            login: '/login'
        };
    };

    login() {
        return function (require, response) {
        };
    };

    efetuaLogin() {

        return function (require, response, next) {

            const passport = require.passport;

            passport.authenticate('local', (error, user, info) => {
                if (info) {
                    return response.status(200).json(info);
                };

                if (error) {
                    return next(error);
                };

                require.login(user, (error) => {
                    if (error) {
                        return next(error);
                    };

                    return response.send('usuario logado');
                });
            })(require, response, next);
        };



    };

};

module.exports = BaseControlador;