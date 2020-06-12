const { check } = require('express-validator');

class Mensagem {

    static validation() {
        return[
            check('mensagem')
                .isLength({ min: 5 })
                .withMessage('A mensagem não pode conter menos de 5 caracteres'),
        ];
    };

};

module.exports = Mensagem;