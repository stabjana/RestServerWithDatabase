'use strict';

const path = require('path');

const config = require('./configOrders.json');
const storageEnginePath = path.join(__dirname, config.engineFolder, config.storageEngine.folder);
const dataStoragePath = path.join(storageEnginePath, config.storageEngine.dataStorageFile);

const storagePath = path.join(__dirname, config.allStoragesFolder, config.storage.folder);

const Datastorage = require(dataStoragePath);
const storage = new Datastorage(storagePath, config.storage.storageConfigFile);

// storage.get(1).then(console.log);

function createProductLine(product){
    return {
        productId: product.productId,
        productname: product.productname,
        amount: product.amount,
        price:product.price,
        rowTotal:product.amount*product.price
    };
}

async function createReport(orderNumber){
    const orders= await storage.get(orderNumber);
    if(orders.length>0){
        const products=orders[0].products;
        return products.map(product=>createProductLine(product));
    }
    else{
        return [];
    }
}

// createReport(123).then(console.log);

// async function createFullReport(orderNumber) {
//     const orders = await storage.get(orderNumber);
//     let totalSum=0;
//     const lines=[];
//     if (orders.length > 0) {
//         for(const product of orders[0].products){
//             const line = createProductLine(product);
//             lines.push(line);
//             totalSum+=line.rowTotal;
//         }
//     }
//     return {
//         lines,
//         totalSum
//     }
// }

// createFullReport(3).then(console.log);

function createFullReport(orders) {
    let totalSum = 0;
    const lines = [];
    if (orders.length > 0) {
        for (const product of orders[0].products) {
            const line = createProductLine(product);
            lines.push(line);
            totalSum += line.rowTotal;
        }
    }
    return {
        lines,
        totalSum
    }
}

// storage.get(1).then(orders=>createFullReport(orders)).then(console.log);

const tmpOrders=[{
    products:[
        {
            "productId": 15,
            "productname": "Computer",
            "model": "AIWay",
            "amount": 1,
            "price": 225,
            "links": [],
            "manufacturer": {
                "name": "EU AI co",
                "country": "EU",
                "links": {
                    "home": [
                        "link1"
                    ]
                }
            }
        }
    ]
}]

console.log(createFullReport(tmpOrders))