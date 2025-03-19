'use strict';

module.exports = class SqlParams {

    // "insert into employee (id, firstname, lastname, department, salary)",
    // "values(?,?,?,?,?)"

    static insert(item) {
        return [
            item.id, item.firstname, item.lastname, item.department, item.salary
        ]
    }

    // "update employee set firstname=?, lastname=?, department=?,",
    // "salary=? where id=?"

    static update(item) {
        return [
            item.firstname, item.lastname, item.department, item.salary, item.id
        ]
    }
}