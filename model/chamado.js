const { check } = require('express-validator');

class Chamado {

    static validation() {
        return [
            check('titulo')
                .isLength({ min: 5 })
                .withMessage('O titulo deve conter mais de 5 caracteres'), // Tratamento de erros, o titulo com no minimo 5 caracteries

            check('descricao')
                .isLength({ min: 5 })
                .withMessage('A descricao não deve estar vazia') // Checando se a descricao está vazia
        ]
    }
}

module.exports = Chamado;