const rotasChamados = require('./chamado-rotas');
const rotasMensagem = require('./mensagem-rotas');
const rotasBase = require('./base-rotas');

module.exports = (app) => {
    rotasChamados(app);
    rotasMensagem(app);
    rotasBase(app);
};