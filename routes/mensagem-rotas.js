const MensagemControlador = require('../controller/mensagem-controlador');
const mensagemControlador = new MensagemControlador();
const Mensagem = require('../model/mensagem');

module.exports = (app) => {
    const mensagemRotas = MensagemControlador.routes();

    app.use(mensagemRotas.autenticados, function (require, response, next) {
        if (require.isAuthenticated()) {
            next();
        } else {
            response.send('Usuario não logado');
        };
    });

    app.route(mensagemRotas.lista)
        .get(mensagemControlador.index());

    app.route(mensagemRotas.form)
        .post(Mensagem.validation(), mensagemControlador.create());
};