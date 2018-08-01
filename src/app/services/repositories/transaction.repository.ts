import {Injectable} from '@angular/core';

import {RxCollection, RxDatabase, RxDocument, RxJsonSchema} from 'rxdb';
import {Observable} from 'rxjs/Observable';

import {UUID} from 'angular2-uuid';

import {RxDBService} from '../database/rxdb.service';
import {Transaction} from '../../domain/transaction';
import {Entity} from '../../domain/entity';
import {Tag} from '../../domain/tag';

type RxTransactionDocument = RxDocument<Transaction>;

declare class RxTransactionCollection extends RxCollection<Transaction> {
    pouch: any;
}

class RxTransactionDatabase extends RxDatabase {
    transaction?: RxTransactionCollection;
}

@Injectable()
export class TransactionRepository {
    static schema: RxJsonSchema = {
        'title': 'Transaction',
        'description': 'describes a simple transaction',
        'version': 0,
        'disableKeyCompression': true,
        'type': 'object',
        'properties': {
            'id': {
                'type': 'string',
                'primary': true,
                'default': ''
            },
            'type': {
                'type': 'number',
            },
            'amount': {
                'type': 'number',
            },
            'vat': {
                'type': 'number',
            },
            'date': {
                'type': 'string',
            },
            'entity': {
                'ref': 'entity',
                'type': 'string',
            },
            'tags': {
                "type": "array",
                'ref': 'tag',
                "items": {
                    "type": "string"
                },
            },
            'string': {
                'type': 'string',
            },
        },
        'required': ['amount']
    };

    constructor(private dbService: RxDBService) {
        this.dbService.addCollection('transaction', TransactionRepository.schema);
    }

    public async findOne(id: string): Promise<Transaction> {
        const db: RxTransactionDatabase = <RxTransactionDatabase> await this.dbService.get();

        return db.transaction
            .findOne({id: {$eq: id}})
            .exec();
    }

    public async findAll(): Promise<Array<Transaction>> {
        const db: RxTransactionDatabase = <RxTransactionDatabase> await this.dbService.get();

        return db.transaction
            .find()
            .exec();
    }

    public async delete(id: string): Promise<boolean> {
        const db: RxTransactionDatabase = <RxTransactionDatabase> await this.dbService.get();

        const transaction: RxTransactionDocument = await db.transaction
            .findOne({id: {$eq: id}})
            .exec();

        return transaction.remove();
    }

    public async upsert(transaction: Transaction): Promise<Transaction> {
        const db: RxTransactionDatabase = <RxTransactionDatabase> await this.dbService.get();

        await db.transaction.upsert({
            id: transaction.id ? transaction.id : UUID.UUID(),
            type: <number> transaction.type,
            amount: transaction.amount,
            vat: transaction.vat,
            date: transaction.date,
            entity: <Entity><any> transaction.entity.id,
            tags: <Array<Tag>><any> transaction.tags.map( t => t.id),
            comments: transaction.comments,
        });

        return transaction;
    }
}
