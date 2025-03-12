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

    #primary_key
    #resource
    constructor(storageFolder, storageConfigFile) {
        const storageConfig = require(path.join(storageFolder, storageConfigFile));

        const Database = require(path.join(__dirname, storageConfig.databaseFile));
        this.#storage = new Database(storageConfig.options);

        const sql = storageConfig.sqlStatements;
        this.#getAllSql = sql.getAll.join(' ');
        this.#getOneSql = sql.getOne.join(' ');
        this.#insertSql = sql.insert.join(' ');
        this.#updateSql = sql.update.join(' ');
        this.#removeSql = sql.remove.join(' ');

        this.#primary_key = sql.primary_key;
        this.#resource = sql.resource;
    }
    // we stopped the lesson here and I did this part on my own:
    //getters
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

    async getKeys() {
        return this.#storage.getKeys();
    }

    async getAll() {
        return this.#storage.executeQuery(this.#getAllSql);
    }

    async get(value, key = this.#primary_key) {
        return this.#storage.executeQuery(this.#getOneSql, [value, key]);
    }

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