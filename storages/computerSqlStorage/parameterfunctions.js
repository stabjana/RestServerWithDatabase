'use strict';

module.exports = class SqlParams{

    static insert(item){
        return [
            item.id, item.name, item.type,  item.price
        ]
    }

    static update(item) {
        return [
            item.name, item.type, item.price, item.id
        ]
    }
}