const connection = require('mysql');

const db = connection.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'Suporte'
});

db.connect((error) => {
    if (error) throw error;

    //Criação da tabela Usuario
    let mysql = `
            CREATE TABLE IF NOT EXISTS Usuarios(
                idUsuarios SMALLINT NOT NULL AUTO_INCREMENT,
                nome VARCHAR(100) NOT NULL,
                departamento VARCHAR(50),
                unidade VARCHAR(50),
                email VARCHAR(255),
                senha VARCHAR(50),
                PRIMARY KEY(idUsuarios)
            );`;
        db.query(mysql, (error) => {
            if (error) throw error;
        });

    //Criação da tabela Chamados
    mysql = `
        CREATE TABLE IF NOT EXISTS Chamados(
            idChamados SMALLINT(10) NOT NULL AUTO_INCREMENT,
            descricao VARCHAR(500),
            titulo VARCHAR(50),
            data_Chamado DATETIME,
            estado VARCHAR(1) DEFAULT'A',
            PRIMARY KEY(idChamados)
        );`;
        db.query(mysql, (error) => {
            if (error) throw error;
        });

    //Criação da tabela Mensagem
    mysql = `
        CREATE TABLE IF NOT EXISTS Mensagem(
            idMensagem SMALLINT(50) PRIMARY KEY NOT NULL AUTO_INCREMENT,
            mensagem VARCHAR(100),
            dataMensagem DATE,
            hora TIME,
            chamadoIdchamado SMALLINT(10),
        CONSTRAINT fk_chamadoIdchamado FOREIGN KEY(chamadoIdchamado) REFERENCES chamados(idChamados)
    );`;
        db.query(mysql, (err) => {
            if (err) throw err;
        });

});

module.exports = db;