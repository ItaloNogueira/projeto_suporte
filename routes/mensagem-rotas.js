const MensagemControlador = require('../controller/mensagem-controlador');
const mensagemControlador = new MensagemControlador();
const Mensagem = require('../model/mensagem');

module.exports = (app) => {
    const mensagemRotas = MensagemControlador.rotas();

    app.route(mensagemRotas.lista)
        .get(mensagemControlador.index());

    app.route(mensagemRotas.form)
        .post(Mensagem.validation(), mensagemControlador.create());
};