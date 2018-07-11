import {Injectable} from '@angular/core';

import RxDB from 'rxdb/plugins/core';
import {RxDatabase, RxCollectionCreator, RxJsonSchema} from 'rxdb';
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check';
import RxDBErrorMessagesModule from 'rxdb/plugins/error-messages';
import RxDBValidateModule from 'rxdb/plugins/validate';
import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election';
import RxDBReplicationModule from 'rxdb/plugins/replication';
import PouchdbAdapterIdb from 'pouchdb-adapter-idb';
import PouchAdapterHttp from 'pouchdb-adapter-http';

import {environment} from '../../../environments/environment';

@Injectable()
export class RxDBService {
    static databaseName = 'bookeepr';
    static useAdapter = 'idb';
    static syncUrl = 'http://' + window.location.hostname + ':10101';
    static dbPromise: Promise<RxDatabase> = null;

    private collections: Array<RxCollectionCreator> = [];

    constructor() {
        // TODO add replication stuff

        if (environment.production === false) {
            RxDB.plugin(RxDBErrorMessagesModule);
            RxDB.plugin(RxDBSchemaCheckModule);

            // RxDB.QueryChangeDetector.enableDebugging();
        }

        RxDB.plugin(RxDBValidateModule);
        RxDB.plugin(RxDBLeaderElectionModule);
        RxDB.plugin(RxDBReplicationModule);
        RxDB.plugin(PouchAdapterHttp);
        RxDB.plugin(PouchdbAdapterIdb);

        // RxDB.QueryChangeDetector.enable();
    }

    public addCollection(collectionName: string, schema: RxJsonSchema) {
        this.collections.push({
            name: collectionName,
            schema: schema,
        });
    }

    public get(): Promise<RxDatabase> {
        if (RxDBService.dbPromise) {
            return RxDBService.dbPromise;
        }

        RxDBService.dbPromise = this.create();

        return RxDBService.dbPromise;
    }

    private async create(): Promise<RxDatabase> {
        const db: RxDatabase = await RxDB.create({
            name: RxDBService.databaseName,
            adapter: RxDBService.useAdapter,
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
