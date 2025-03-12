'use strict';

const path = require('path');

const config= require('./configOrders.json');
const storageEnginePath = path.join(__dirname, config.engineFolder, config.storageEngine.folder);
const dataStoragePath = path.join(storageEnginePath, config.storageEngine.dataStorageFile);

const storagePath = path.join(__dirname, config.allStoragesFolder, config.storage.folder);

const Datastorage = require(dataStoragePath);
const storage = new Datastorage(storagePath, config.storage.storageConfigFile);

//storage.getAll().then(console.log);

async function getAllAddresses(){
    const allOrders=await storage.getAll();
     return allOrders.map(order=>addrNoPhone(order.customer.address));
}

// getAllAddresses().then(console.log);

async function getAddress(firstname,lastname){
    const allOrders = await storage.getAll();
    const foundAddr=[];
    for(const order of allOrders){
        if(order.customer.firstname===firstname &&
           order.customer.lastname===lastname){
            foundAddr.push(order.customer.address);
        }
    }
    return foundAddr;
}

function compareAddr(addrA,addrB){
    if (addrA.street !== addrB.street) return false;
    if (addrA.postcode !== addrB.postcode) return false;
    if (addrA.country !== addrB.country) return false;
    return true;
}

function firstIndexOfAddr(addr, array){
    for(let ind=0;ind<array.length; ind++){
        if(compareAddr(addr, array[ind])){
            return ind;
        }
    }
    return -1;
}

function firstIndexOfAddrV2(addr, array, compareAddr) {
    for (let ind = 0; ind < array.length; ind++) {
        if (compareAddr(addr, array[ind])) {
            return ind;
        }
    }
    return -1;
}

function isAddrInArray(addr, array, compareAddr){
    for(const address of array){
        if(compareAddr(addr, address)){
            return true;
        }
    }
    return false;
}



const testAdr = {
    "street": "Rantakatu 24",
    "postcode": "01000 Helsinki",
    "country": "Finland"
}

// getAllAddresses()
//     .then(addrs => isAddrInArray(testAdr, addrs, compareAddr))
//     .then(console.log);

// function removeDuplicatesV2(addresses, compareAddr){
//     const noPhones=addresses.map(addr=>addrNoPhone(addr));
//     const foundAddr=[];
//     while(noPhones.length>0){
//         if(!isAddrInArray(noPhones[0], foundAddr, compareAddr)){
//             foundAddr.push(noPhones[0]);
//             noPhones.shift();
//         }
//         else{
//             noPhones.shift();
//         }
//         console.log('foundAddr: ',foundAddr);
//         console.log('noPhones: ',noPhones);
//     }

//     return foundAddr;
// }

function removeDuplicatesV2(addresses, compareAddr) {
    const noPhones = addresses.map(addr => addrNoPhone(addr));
    const foundAddr = [];
    while (noPhones.length > 0) {
        if (!isAddrInArray(noPhones[0], foundAddr, compareAddr)) {
            foundAddr.push(noPhones[0]);
        }
        noPhones.shift();
    }

    return foundAddr;
}

// getAllAddresses()
//     .then(addresses => removeDuplicatesV2(addresses, compareAddr))
//     .then(console.log);

getAllAddresses()
    .then(addrs => removeDuplicatesV2( addrs, (addrA, addrB) => addrA.country === addrB.country))
    .then(console.log);

// getAllAddresses()
//     .then(addrs => firstIndexOfAddrV2(testAdr, addrs, compareAddr))
//     .then(console.log);

// getAllAddresses()
//     .then(addrs => firstIndexOfAddrV2(testAdr, addrs, (addrA, addrB) => addrA.country === addrB.country))
//     .then(console.log);

// getAllAddresses()
//     .then(addrs => firstIndexOfAddr(testAdr, addrs))
//     .then(console.log);

// getAddress('Matt', 'River')
//     .then(result => result.map(addr => addrNoPhone(addr)))
//     .then(addrs => firstIndexOfAddr(testAdr, addrs))
//     .then(console.log);

function addrNoPhone(addr){
    return {
        street:addr.street,
        postcode:addr.postcode,
        country:addr.country
    }
}


function removeDuplicates(addresses) {
    const noPhones = addresses.map(addr => addrNoPhone(addr));
    const foundAddr=[];
    const addrStringTemp=[];
    for (const address of noPhones){
        const addr = JSON.stringify(address);
        if(!addrStringTemp.includes(addr)){
            addrStringTemp.push(addr);
            foundAddr.push(address);
        } 
    }
    return foundAddr;
}

// getAddress('Matt','River')
//     .then(result=>removeDuplicates(result))
//     .then(console.log);

// getAddress('Matt','River').then(console.log);

// getAddress('Matt','River')
//     .then(result => result.map(addr => addrNoPhone(addr)))
//     .then(console.log);

