class UserDao {

    constructor(db) {
        this._db = db;
    };

    searchByEmail(email) {
        
        return new Promise((resolve, reject) => {
            this._db.query(`
                SELECT 
                    idUsuarios, 
                    nome, 
                    email, 
                    senha 
                FROM Usuarios WHERE email = ?`
                , [email]
                , (error, result) => {
                    if (error) return reject(error);

                    const user = result[0];
                    return resolve(user);
                });
        });
    };


};

module.exports = UserDao;