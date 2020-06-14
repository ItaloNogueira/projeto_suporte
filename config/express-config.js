const express = require('express');
const bodyParser = require('body-parser');
const authenticationSession = require('./authentication-session');
 const routes = require('../routes/routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

authenticationSession(app);
 routes(app);

app.use(function (req, resp) {
    return resp.status(404).end();
});

app.use(function (erro, req, resp) {
    return resp.status(500).end();
});

module.exports = app;