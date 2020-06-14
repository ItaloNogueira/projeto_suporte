class MessageDao {

    constructor(db) {
        this._db = db;
    };

    // lista as mensagens relacionadas ao determinado chamado
    index(idChamado, idUsuario) {
        return new Promise((resolve, reject) => {
            this._db.query(`
                SELECT 
                    mensagem.mensagem as mensagem, 
                    usuarios.nome as nome, 
                    chamados.titulo as titulo,
                    chamadoIdchamado as idChamado
                FROM mensagem 
                left join chamados
                ON chamados.idChamados = mensagem.chamadoIdchamado
                LEFT JOIN usuarios
                ON mensagem.chamadoIdUsuario = usuarios.idUsuarios 
                WHERE chamados.idChamados = ${idChamado} 
                AND usuarios.idUsuarios = ${idUsuario};`
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

    create(idChamado, mensagem, idUsuario) {

        return new Promise((resolve, reject) => {
            this._db.query(`
                INSERT INTO Mensagem(
                    mensagem,
                    chamadoIdUsuario,
                    chamadoIdchamado
                    
                )VALUES(
                    ?,
                    ?,
                    ?
                );`
                , [mensagem.mensagem, idUsuario, idChamado]
                , (error) => {
                    if (error) return reject(error);

                    return resolve(mensagem);
                });
        });
    };


};

module.exports = MessageDao;