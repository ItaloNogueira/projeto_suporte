const ChamadoControlador = require('../controller/chamado-controlador');
const chamadoControlador = new ChamadoControlador();
const Chamado = require('../model/Chamado');

module.exports = (app) => {

    const chamadoRotas = ChamadoControlador.routes();

    app.use(chamadoRotas.autenticados, function (require, response, next) {
        if (require.isAuthenticated()) { 
            next();
        }else{
            response.send('Usuario não logado');
        };
  
    });

    app.route(chamadoRotas.lista)
        .get(chamadoControlador.index());

    app.post(chamadoRotas.cadastra, Chamado.validation(), chamadoControlador.create());
    app.put(chamadoRotas.seleciona, Chamado.validation(), chamadoControlador.update());

    app.route(chamadoRotas.seleciona)
        .get(chamadoControlador.searchById());

    app.route(chamadoRotas.remove)
        .delete(chamadoControlador.remove());

};