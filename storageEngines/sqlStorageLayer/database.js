'use strict';

const mariadb = require('mariadb');

module.exports = class Database {
    #options;

    constructor(options) {
        this.#options = options;
    }

    doQuery(sql, parameters) {
        return new Promise(async (resolve, reject) => {
            let connection;
            try {
                connection = await mariadb.createConnection(this.#options);
                const queryResult = await connection.query(sql, parameters);
                if (typeof queryResult.affectedRows === 'undefined') {
                    resolve({ queryResult, resultSet: true });
                }
                else {
                    resolve({
                        queryResult: {
                            rowsChanged: queryResult.affectedRows,
                            insertId: queryResult.insertId,
                            status: queryResult.warningStatus
                        },
                        resultSet: false
                    })
                }
            }
            catch (err) {
                reject('SQL-error' + err.message);
            }
            finally {
                if (connection) connection.end();
            }
        })
    } // end of doQuery

}// end of class