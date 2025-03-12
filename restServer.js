'use strict';

const path = require('path');

const express=require('express');


const cors=require('cors');

const errorMessage = `
########################################
Usage: node restServer <configFileName>

For Example: node restServer config.json
########################################`;

if (process.argv.length < 3) {
    console.log(errorMessage);
}
else {
    const [, , configFileName] = process.argv;
    try {
        const config = require(path.join(__dirname, configFileName));
        startServer(config);
    }
    catch (error) {
        console.log(error);
        console.log(`Config file '${configFileName}' not found.`);
    }
} //main program end

function startServer(config){

    const app = express();

    const { port, host } = config;
    const storageEnginePath=path.join(__dirname, config.engineFolder, config.storageEngine.folder);
    const dataStoragePath = path.join(storageEnginePath,config.storageEngine.dataStorageFile);

    const storagePath = path.join(__dirname, config.allStoragesFolder, config.storage.folder);

    const Datastorage = require(dataStoragePath);
    const storage = new Datastorage(storagePath, config.storage.storageConfigFile);

    app.use(cors());
    app.use(express.json());

    app.get('/api', (req, res) => res.json(storage.RESOURCE));

    app.get(`/api/${storage.RESOURCE}/primarykey`, (req, res) => res.json(storage.PRIMARY_KEY));

    app.get(`/api/${storage.RESOURCE}`, (req, res) =>
        storage.getAll().then(result => res.json(result))
    );

    app.get(`/api/${storage.RESOURCE}/keys`, (req, res) =>
        storage.KEYS.then(result => res.json(result))
    );

    app.get(`/api/${storage.RESOURCE}/:id`, (req, res) =>
        storage.get(req.params.id).then(result => res.json(result))
    );

    app.get(`/api/${storage.RESOURCE}/:key/:value`, (req, res) =>
        storage.get(req.params.value,req.params.key).then(result => res.json(result))
    );

    app.post(`/api/${storage.RESOURCE}/search`, (req, res) =>
        storage.get(req.body.value, req.body.key)
            .then(result => res.json(result))
    );

    app.post(`/api/${storage.RESOURCE}`, (req, res) =>
        storage.insert(req.body)
            .then(result => res.json(result))
            .catch(err => res.json(err))
    );

    app.put(`/api/${storage.RESOURCE}`, (req, res) =>
        storage.update(req.body)
            .then(result => res.json(result))
            .catch(err => res.json(err))
    );

    // app.put(`/api/${storage.RESOURCE}`, async (req, res) =>{
    //     try{
    //         const result = await storage.update(req.body);
    //         res.json(result);
    //     }
    //     catch(err){
    //         res.json(err);
    //     }
    // });

    app.delete(`/api/${storage.RESOURCE}/:id`, (req, res) =>
        storage.remove(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.json(err))
    );

    app.all('*', (req, res) => res.json('not supported'));

    app.listen(port, host, () => console.log(`Restserver ${host}:${port} serving`));
}

