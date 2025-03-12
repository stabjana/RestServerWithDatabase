'use strict';

module.exports = function adapt(order) {
    order.ordernumber = +order.ordernumber;
    for (const product of order.products) {
        product.productId = +product.productId;
        product.amount = +product.amount;
    }
    return order;
}