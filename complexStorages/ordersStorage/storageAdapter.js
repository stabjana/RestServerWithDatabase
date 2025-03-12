'use strict';

module.exports = function adapt(order) {
    order.ordernumber = +order.ordernumber;
    for (const product of order.products) {
        product.productId = +product.productId;
        product.amount = +product.amount;
        product.price = +product.price
    }
    return order;
}
// module.exports = function adapt(order) {
//     const temp=JSON.parse(JSON.stringify(order));
//     temp.ordernumber=+temp.ordernumber;
//     for(const product of temp.products){
//         product.productId = +product.productId;
//         product.amount = +product.amount;
//         product.price = +product.price
//     }

//     return temp;
// }