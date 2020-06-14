class ChamadoDao {

    constructor(db) {
        this._db = db;
    };

    // Retorna a lista de chamados do banco
    index(idUsuario) {
        return new Promise((resolve, reject) => {
            this._db.query(`
                SELECT 
                    idChamados, 
                    descricao, 
                    titulo 
                FROM Chamados 
                WHERE idUsuarios = ${idUsuario};`
                , (error, results) => {
                    if (error) return reject(error);

                    return resolve(results);
                }
            );
        });
    };

    // Retorna um chamado do banco pelo ID 
    searchById(idChamado) {
        return new Promise((resolve, reject) => {
            this._db.query(`
                SELECT 
                    idChamados, 
                    descricao, 
                    titulo 
                FROM Chamados WHERE idChamados = ${idChamado};`
                , (error, result) => {

                    const chamado = result[0];

                    if (error) return reject(error);

                    return resolve(chamado);
                });
        });
    };

    // Adiciona um chamado no banco
    create(chamado, idUsuario) {

        return new Promise((resolve, reject) => {
            this._db.query(`
                INSERT INTO Chamados(
                    titulo,
                    descricao,
                    idUsuarios
                ) VALUES (
                    ?, 
                    ?,
                    ?
                );`
                , [chamado.titulo, chamado.descricao, idUsuario]
                , (error) => {
                    if (error) return reject(error);

                    return resolve(chamado);
                });
        });
    };

    // Atualiza um chamado no banco
    update(chamado, idChamado) {

        return new Promise((resolve, reject) => {
            this._db.query(`
                UPDATE Chamados SET 
                    descricao = ?, 
                    titulo = ? 
                WHERE idChamados = ?`
                , [chamado.descricao, chamado.titulo, idChamado]
                , (error) => {
                    if (error) return reject(error);
                    
                    return resolve(chamado);
                });
        });
    };

    // Remove um chamado pelo ID
    remove(idChamado) {
        return new Promise((resolve, reject) => {
            this._db.query(
                `DELETE FROM Chamados WHERE idChamados = ${idChamado};`
                , (error) => {
                    if (error) return reject(error);

                    return resolve({idChamado});
                });
        });
    };


};

module.exports = ChamadoDao;