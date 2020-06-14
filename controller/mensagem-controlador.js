const db = require('../config/database');
const MensagemDao = require('../data/message-dao');
const { validationResult } = require('express-validator');

class MensagemControlador {

    static routes() {
        return {
            autenticados: "/mensagem*",
            lista: "/mensagem/:id",
            form: "/mensagem/form/:id"
        };
    };

    index() {
        return function (require, response) {
            const idChamado = require.params.id;
            const mensagemDao = new MensagemDao(db);
            const idUsuario = require.sessio.passport.user.id;

            mensagemDao.index(idChamado, idUsuario)
                .then(results => response.json(results))
                .catch(error => console.log(error));
        };
    };

    create() {
        return function (require, response) {
            const errors = validationResult(require);
            const idChamado = require.params.id;
            const mensagemDao = new MensagemDao(db);
            const idUsuario = require.session.passport.user.id;

            if (!errors.isEmpty()) {
                return response.json(
                    {
                        mensagem: 
                        [{
                            idChamado: require.params.id,
                            mensagem: require.body.mensagem
                        }],

                        errorsValidator: errors.array()
                    }
                );
            };

            mensagemDao.create(idChamado, require.body, idUsuario)
                .then(result => response.status(200).json(result))
                .catch(error => response.status(400));
        };
    };

};

module.exports = MensagemControlador;