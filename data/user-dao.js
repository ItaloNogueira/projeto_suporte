class UserDao {

    constructor(db){
        this._db = db;
    };

    searchByEmail(idUsuario){
        return new Promise((resolve, reject) => {
            this._db.query(`
                SELECT 
                    idUsuarios, 
                    nome, 
                    email, 
                    senha 
                FROM Usuarios WHERE email = ?`
                , (error, result) => {
                    if(error) return reject(error);

                    return resolve(result);
                });
        });
    };


};