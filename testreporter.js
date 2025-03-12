'use strict';

const path = require('path');

const config = require('./configOrders.json');
const storageEnginePath = path.join(__dirname, config.engineFolder, config.storageEngine.folder);
const dataStoragePath = path.join(storageEnginePath, config.storageEngine.dataStorageFile);

const storagePath = path.join(__dirname, config.allStoragesFolder, config.storage.folder);

const Datastorage = require(dataStoragePath);
const storage = new Datastorage(storagePath, config.storage.storageConfigFile);

const createFullReport =require('./reporter');

// storage.get(1).then(orders=>createFullReport(orders)).then(console.log);
storage.get(1).then(orders => createFullReport(orders)).then(printReport);

// function printReport(fullReport){
//     console.log('#*'.repeat(40));
//     for(const line of fullReport.lines){
//         const message=`Id: ${line.productId}, ${line.productname}: `+
//             `${line.amount}, price: ${line.price}, total: ${line.rowTotal}`;
//         console.log(message);
//     }
//     console.log('###################################');
//     console.log(`                   Total: ${fullReport.totalSum.toFixed(2)}`);
// }

function printReport(fullReport) {
    const messages=[];
    for (const line of fullReport.lines) {
        messages.push(`Id: ${line.productId}, ${line.productname}: ` +
            `${line.amount}, price: ${line.price}, total: ${line.rowTotal}`)
    }
    const longest=Math.max(...messages.map(message=>message.length));
    console.log('#'.repeat(longest+2));
    console.log(messages.join('\n'));
    console.log('#'.repeat(longest+2));
    console.log(`Total: ${fullReport.totalSum.toFixed(2)}`);
}