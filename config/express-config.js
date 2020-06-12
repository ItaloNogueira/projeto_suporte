const express = require('express');
const bodyParser = require('body-parser');
//const sessaoAutenticacao = require('./sessao-autenticacao');
const routes = require('../routes/routes');
const consign = require('consign');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

consign()
    .include('routes')
    .into(app)

routes(app);
//sessaoAutenticacao(app);



app.use(function (req, resp) {
    return resp.status(404).end();
});

app.use(function (erro, req, resp) {
    return resp.status(500).end();
});

module.exports = app;