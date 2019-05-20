const mysql = require('mysql');

class SQL {
    constructor(host, user, password, database) {
        this.connection = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database
        });
    }

    connect() {
        this.connection.connect();
    }

    endConnection() {
        this.connection.end();
    }

    insert(name, email, telephone, password) {
        this.connection.query(`insert into user select '${name}', '${email}', '${telephone}', '${password}';`, (error, results, fields) => {
            if (error) throw error;
        });
    }

    fetch(email) {
        return new Promise((resolve, reject) => {
            this.connection.query(`select * from user where email='${email}'`, (err, results, fields) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }
}

module.exports = SQL;