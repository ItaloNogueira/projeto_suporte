const BaseControlador = require('../controller/base-controlador');
const baseControlador = new BaseControlador;

module.exports = (app) => { 

    const rotasBase = BaseControlador.routes();

    //app.get(rotasBase.login, baseControlador.login());
    app.post(rotasBase.login, baseControlador.efetuaLogin());

};