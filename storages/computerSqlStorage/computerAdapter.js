'use strict';

module.exports=function adapt(computer) {
    return Object.assign(computer,{
        id: +computer.id,
        price: +computer.price
    });
}


