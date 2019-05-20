const mysql = require('promise-mysql');

class SQL {
    constructor(host, user, password, database) {
        this.connection = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database
        });
        this.result;
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
            //console.log(results[0]);
        });
    }

    async fetch(email) {

        let result = this.connection.query(`select * from user where email='${email}'`);
        return result[0];

    }

}

module.exports = SQL;