const db = require('../config/database');
const ChamadoDao = require('../data/chamado-dao');
const MensagemDao = require('../data/message-dao');
const { validationResult } = require('express-validator');

class ChamadoControlador {

    // Rotas relacionadas aos chamados
    static routes() {
        return {
            autenticados: '/chamados*',
            lista: '/chamados',
            cadastra: '/chamados/form',
            seleciona: '/chamados/form/:id',
            remove: '/chamados/:id'
        };
    };

    index() {
        return function (require, response) {
            const chamadoDao = new ChamadoDao(db);
            const idUsuario = require.session.passport.user.id;
            console.log(idUsuario)

            chamadoDao.index(idUsuario)
                .then(chamados => response.status(200).json({ chamados: chamados }))
                .catch(error => response.status(400));
        };
    };

    searchById() {
        return function (require, response) {
            const chamadoDao = new ChamadoDao(db);
            const idChamado = require.params.id;

            chamadoDao.searchById(idChamado)
                .then(chamado => response.status(200).json({ chamado: chamado }))
                .catch(error => response.status(400));
        };
    };

    create() {
        return function (require, response) {
            const errors = validationResult(require);
            const chamadoDao = new ChamadoDao(db);
            const idUsuario = require.session.passport.user.id;

            if (!errors.isEmpty()) {
                return response.status(400).json(
                    {
                        chamado:
                            [{
                                titulo: require.body.titulo,
                                descricao: require.body.descricao
                            }],

                        errorsValidator: errors.array()
                    }
                );
            };

            chamadoDao.create(require.body)
                .then(results => response.status(201).json(results))
                .catch(error => response.status(400));
        };
    };

    update() {
        return function (require, response) {
            const idChamado = require.params.id;
            const errors = validationResult(require);
            const chamadoDao = new ChamadoDao(db);

            if (!errors.isEmpty()) {
                return response.status(400).json(
                    {
                        chamado:
                            [{
                                id: require.params.id,
                                titulo: require.body.titulo,
                                descricao: require.body.descricao
                            }],

                        errorsValidator: errors.array()
                    }
                );
            };

            chamadoDao.update(require.body, idChamado)
                .then(results => response.status(200).json(results))
                .catch(error => response.status(400));
        };
    };

    remove() {
        return function (require, response) {
            const chamadoDao = new ChamadoDao(db);
            const mensagemDao = new MensagemDao(db);
            const idChamado = require.params.id;

            mensagemDao.remove(idChamado);

            chamadoDao.remove(idChamado)
                .then(results => response.status(200).json(results))
                .catch(error => response.status(400));
        };
    };

};

module.exports = ChamadoControlador;

