'use strict';

module.exports = function adapt(person) {
    return Object.assign(person, {
        id: +person.id,
        salary: +person.salary
    });
}