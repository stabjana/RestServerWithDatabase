'use strict';
const path = require('path');

const {
    CODES,
    TYPES,
    MESSAGES } = require('./statuscodes');

//Datastorage class

module.exports = class Datastorage {
    #storage
    #getAllSql
    #getOneSql
    #insertSql
    #updateSql
    #removeSql
    #search
    #adapt

    #primary_key
    #resource
    constructor(storageFolder, storageConfigFile) {
        const storageConfig = require(path.join(storageFolder, storageConfigFile));

        const Database = require(path.join(__dirname, storageConfig.databaseFile));

        /*   const sqlStatementsPath = path.join(storageFolder, storageConfig.sqlStatements);
          const sqlStatements = require(sqlStatementsPath);  // Load the SQL statements JSON */

        this.#storage = new Database(storageConfig.options);
        this.#adapt = require(path.join(storageFolder, storageConfig.adapterFile));

        const sqlStatements = require(path.join(storageFolder, storageConfig.sqlStatements));

        this.#getAllSql = sqlStatements.getAll.join(' ');
        this.#getOneSql = sqlStatements.getOne.join(' ');
        this.#insertSql = sqlStatements.insert.join(' ');
        this.#updateSql = sqlStatements.update.join(' ');
        this.#removeSql = sqlStatements.remove.join(' ');

        this.#search = sqlStatements.search; // sqlStatements = i. sql

        this.#primary_key = sqlStatements.primary_key;
        this.#resource = sqlStatements.resource;
    }

    // getters
    // we need to add the search to get the parameters for the functions (in the constructor)
    get RESOURCE() {
        return this.#resource;
    }

    get CODES() {
        return CODES;
    }

    get TYPES() {
        return TYPES;
    }

    get PRIMARY_KEY() {
        return this.#primary_key;
    }

    get KEYS() {
        return Promise.resolve(Object.keys(this.#search));
    }

    async getAll() { // ERROR! GET AN EMPTY ARRAY in route: http://localhost:4012/api/employees
        try {
            const result = await this.#storage.doQuery(this.#getAllSql);
            return Promise.resolve(result.queryResult.map(item => this.#adapt(item)));
        } catch (error) {
            console.error(error);
            return Promise.resolve([]); // this is how we defined it in our earlier version - it couldnt fail, gives always an array back - rest server expects that.
        }
    }

    async get(value, key = this.#primary_key) { // refers to capital let from server
        /* const keys = await this.KEYS; // same thing in 2 lines...
        if (!keys.includes(key)) {}; */
        if (!(await this.KEYS).includes(key)) {
            return Promise.resolve([]);
        }
        try {
            const sql = this.#search[key].join(' ');
            const result = await this.#storage.doQuery(sql, [value]);
            return Promise.resolve(result.queryResult.map(item => this.#adapt(item)));
        } catch (error) {
            console.error(error);
            return Promise.resolve([]); // salary is given back as string - we need adapter
        }
    }

    /*    async get(value, key = this.#primary_key) {
           return this.#storage.executeQuery(this.#getOneSql, [value, key]);
       } */



    async insert(item) {
        if (!item || !item[this.#primary_key]) {
            throw new Error(MESSAGES.NOT_INSERTED());
        }

        const exists = await this.get(item[this.#primary_key]);
        if (exists.length > 0) {
            throw new Error(MESSAGES.ALREADY_IN_USE(item[this.#primary_key]));
        }

        const result = await this.#storage.executeQuery(this.#insertSql, Object.values(item));
        return result.affectedRows ? MESSAGES.INSERT_OK(this.#primary_key, item[this.#primary_key]) : MESSAGES.NOT_INSERTED();
    }

    async insert(item) {
        if (item) {
            if (!item[this.#primary_key]) {
                return Promise.reject(MESSAGES.NOT_INSERTED());
            }
            try {
                const result = await this.#storage.doQuery(this.#getOneSql, item[this.#primary_key]);
                if (result.queryResult.length > 0) {
                    return Promise.reject(MESSAGES.ALREADY_IN_USE(item[this.#primary_key]));
                } else {
                    //  await this.#storage.doQuery(this.#insertSql, ); // we need parameter functions as static members of class
                }
            } catch (error) {
                return Promise.reject(MESSAGES.NOT_INSERTED());
            }
        }
        else {
            return Promise.reject(MESSAGES.NOT_INSERTED());
        }
    }

    async update(item) {
        if (!item || !item[this.#primary_key]) {
            throw new Error(MESSAGES.NOT_UPDATED());
        }
        const exists = await this.get(item[this.#primary_key]);
        if (exists.length === 0) {
            throw new Error(MESSAGES.NOT_FOUND(this.#primary_key, item[this.#primary_key]));
        }

        const result = await this.#storage.executeQuery(this.#updateSql, Object.values(item));
        return result.affectedRows ? MESSAGES.UPDATE_OK(this.#primary_key, item[this.#primary_key]) : MESSAGES.NOT_UPDATED();
    }

    async remove(value) {
        if (!value) {
            throw new Error(MESSAGES.NOT_FOUND(this.#primary_key, '--empty--'));
        }

        const result = await this.#storage.executeQuery(this.#removeSql, [value]);
        return result.affectedRows ? MESSAGES.REMOVE_OK(this.#primary_key, value) : MESSAGES.NOT_REMOVED(this.#primary_key, value);
    }

} //end of class