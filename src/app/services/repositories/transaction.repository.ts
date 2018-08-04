import {Injectable} from '@angular/core';

import {RxCollection, RxDatabase, RxDocument, RxJsonSchema} from 'rxdb';
import {Observable} from 'rxjs/Observable';

import {UUID} from 'angular2-uuid';
import * as moment from 'moment';

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
            'comments': {
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

        let transaction: RxTransactionDocument = await db.transaction
            .findOne({id: {$eq: id}})
            .exec();

        let hydratedTransaction: Transaction;

        let tags: Array<Tag> = await transaction.populate('tags');
        let entity: Entity = await transaction.populate('entity');

        hydratedTransaction = {
            id: transaction.id,
            type: transaction.type,
            amount: transaction.amount,
            vat: transaction.vat,
            date: moment(transaction.date).toDate(),
            entity: entity,
            tags: tags,
            comments: transaction.comments,
        };

        return hydratedTransaction;
    }

    public async findAll(): Promise<Array<Transaction>> {
        const db: RxTransactionDatabase = <RxTransactionDatabase> await this.dbService.get();

        let transactions: Array<RxTransactionDocument> = await db.transaction
            .find()
            .exec();

        let hydratedTransactions: Array<Transaction> = [];

        transactions.map(async(transaction) => {
            let tags: Array<Tag> = await transaction.populate('tags');
            let entity: Entity = await transaction.populate('entity');

            hydratedTransactions.push({
                id: transaction.id,
                type: transaction.type,
                amount: transaction.amount,
                vat: transaction.vat,
                date: moment(transaction.date).toDate(),
                entity: entity,
                tags: tags,
                comments: transaction.comments,
            })
        });

        return hydratedTransactions;
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
            amount: parseFloat(<any> transaction.amount),
            vat: parseFloat(<any> transaction.vat),
            date: <Date><any> moment(transaction.date).format('DD/MM/YYYY'),
            entity: <Entity><any> transaction.entity.id,
            tags: <Array<Tag>><any> transaction.tags.map( t => t.id),
            comments: transaction.comments,
        });

        return transaction;
    }
}
