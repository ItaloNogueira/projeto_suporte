class MessageDao {

    constructor(db) {
        this._db = db;
    };

    // lista as mensagens relacionadas ao determinado chamado
    index(idChamado) {
        return new Promise((resolve, reject) => {
            this._db.query(`
                SELECT 
                    mensagem.mensagem as mensagem, 
                    chamados.titulo as titulo,
                    chamadoIdchamado as idChamado
                FROM mensagem 
                LEFT JOIN chamados
                ON chamados.idChamados = mensagem.chamadoIdchamado
                WHERE chamados.idChamados = ${idChamado};`
                , (error, results) => {
                    if (error) return reject(error);

                    return resolve(results);
                });
        });
    };

    // Remove todas as mensagens relacionadas ao chamado
    remove(idChamado) {
        return new Promise((resolve, reject) => {
            this._db.query(`
            DELETE FROM Mensagem WHERE chamadoIdchamado = ${idChamado};`
                , (error) => {
                    if (error) return reject(error);

                    return resolve(idChamado);
                });
        });
    };

    create(idChamado, mensagem){

        return new Promise((resolve, reject) => {
            this._db.query(`
                INSERT INTO Mensagem(
                    mensagem,
                    chamadoIdchamado    
                )VALUES(
                    ?,
                    ?
                );`
                , [mensagem.mensagem, idChamado]
                , (error) => {
                    if (error) return reject(error);

                    return resolve(mensagem);
                });
        });
    };


};

module.exports = MessageDao;