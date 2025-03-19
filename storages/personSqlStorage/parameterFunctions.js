'use strict';

module.exports = class SqlParams {
    // no objects -  no constructor

    static insert(item) {
        return [
            item.id, item.firstname, item.lastname, item.department, item.salary
        ]
    }
    static update(item) {
        return [
            item.firstname, item.lastname, item.department, item.salary, item.id
        ]
    }

}