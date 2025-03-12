'use strict';

const {
    CODES,
    TYPES,
    MESSAGES } = require('./statuscodes');

const StorageLayer = require('./storageLayer');

//Datastorage class

module.exports=class Datastorage{
    #storage

    constructor(storageFolder, storageConfigFile){
        this.#storage = new StorageLayer(storageFolder, storageConfigFile);
    }

    //getters
    get RESOURCE(){
        return this.#storage.RESOURCE;
    }
    get CODES(){
        return CODES;
    }

    get TYPES(){
        return TYPES;
    }

    get PRIMARY_KEY(){
        return this.#storage.PRIMARY_KEY;
    }

    get KEYS(){
        return this.#storage.getKeys();
    }

    getAll(){
        return this.#storage.getAllFromStorage();
    }

    get(value, key = this.PRIMARY_KEY){ //this.PRIMARY_KEY
        return this.#storage.getFromStorage(value,key);
    }

    insert(item){
        return new Promise(async (resolve,reject)=>{
            if(item){
                if (!item[this.PRIMARY_KEY]){
                    reject(MESSAGES.NOT_INSERTED());
                }
                else if ((await this.#storage.getFromStorage(item[this.PRIMARY_KEY])).length>0){
                    reject(MESSAGES.ALLREADY_IN_USE(item[this.PRIMARY_KEY]));
                }
                else if (await this.#storage.addToStorage(item)){
                    resolve(MESSAGES.INSERT_OK(this.PRIMARY_KEY, item[this.PRIMARY_KEY]));
                }
                else{
                    reject(MESSAGES.NOT_INSERTED());
                }
            }
            else{
                reject(MESSAGES.NOT_INSERTED());
            }
        });
    } // end of insert

    update(item){
        return new Promise(async (resolve,reject)=>{
            if(item){
                if (!item[this.PRIMARY_KEY]) {
                    reject(MESSAGES.NOT_UPDATED());
                }
                else if ((await this.#storage.getFromStorage(item[this.PRIMARY_KEY])).length > 0) {
                    if (await this.#storage.updateStorage(item)){
                        resolve(MESSAGES.UPDATE_OK(this.PRIMARY_KEY, item[this.PRIMARY_KEY]));
                    }
                    else{
                        reject(MESSAGES.NOT_UPDATED());
                    }
                }
                else if (await this.#storage.addToStorage(item)){
                    resolve(MESSAGES.INSERT_OK(this.PRIMARY_KEY, item[this.PRIMARY_KEY]))
                }
                else{
                    reject(MESSAGES.NOT_INSERTED());
                }
            }
            else{
                reject(MESSAGES.NOT_UPDATED());
            }
        });
    };

    remove(value){
        return new Promise(async (resolve,reject)=>{
            if(!value){
                reject(MESSAGES.NOT_FOUND(this.PRIMARY_KEY, '--empty--'));
            }
            else if (await this.#storage.removeFromStorage(value)){
                resolve(MESSAGES.REMOVE_OK(this.PRIMARY_KEY,value));
            }
            else{
                reject(MESSAGES.NOT_REMOVED(this.PRIMARY_KEY,value));
            }
        });
    } //end of remove

} //end of class