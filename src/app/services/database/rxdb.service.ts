import {Injectable} from '@angular/core';

import * as RxDB from 'rxdb';
import PouchdbAdapterIdb from 'pouchdb-adapter-idb';
import PouchAdapterHttp from 'pouchdb-adapter-http';

@Injectable()
export class RxDBService {
    static databaseName = 'bookeepr';
    static databasePassword = '12345678';
    static useAdapter = 'idb';
    static syncUrl = 'http://' + window.location.hostname + ':10101';
    static dbPromise: Promise<RxDB.RxDatabase> = null;

    private collections: Array<RxDB.RxCollectionCreator> = [];

    constructor() {
        RxDB.QueryChangeDetector.enable();
        RxDB.QueryChangeDetector.enableDebugging();

        RxDB.plugin(PouchdbAdapterIdb);
        RxDB.plugin(PouchAdapterHttp);
    }

    public addCollection(collectionName: string, schema: RxDB.RxJsonSchema) {
        this.collections.push({
            name: collectionName,
            schema: schema,
        });
    }

    public get(): Promise<RxDB.RxDatabase> {
        if (RxDBService.dbPromise) {
            return RxDBService.dbPromise;
        }

        RxDBService.dbPromise = this.create();

        return RxDBService.dbPromise;
    }

    private async create(): Promise<RxDB.RxDatabase> {
        const db: RxDB.RxDatabase = await RxDB.create({
            name: RxDBService.databaseName,
            adapter: RxDBService.useAdapter,
            password: RxDBService.databasePassword,
        });

        db.waitForLeadership().then(() => {
            console.log('isLeader now');
        });

        await Promise.all(this.collections.map(colData => db.collection(colData)));

        this.collections
            .map(col => col.name)
            .forEach(colName => db[colName].sync({ remote: RxDBService.syncUrl + '/' + colName + '/' }));

        return db;
    }
}
