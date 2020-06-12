const rotasChamados = require('./chamado-rotas');
const rotasMensagem = require('./mensagem-rotas');

module.exports = (app) => {
    rotasChamados(app);
    rotasMensagem(app);
};