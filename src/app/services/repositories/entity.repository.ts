import {Injectable} from '@angular/core';

import {RxCollection, RxDatabase, RxDocument, RxJsonSchema} from 'rxdb';
import {Observable} from 'rxjs/Observable';

import {UUID} from 'angular2-uuid';

import {RxDBService} from '../database/rxdb.service';
import {Entity} from '../../domain/entity';

type RxEntityDocument = RxDocument<Entity>;

declare class RxEntityCollection extends RxCollection<Entity> {
    pouch: any;
}

class RxEntityDatabase extends RxDatabase {
    entity?: RxEntityCollection;
}

@Injectable()
export class EntityRepository {
    static schema: RxJsonSchema = {
        'title': 'Entity',
        'description': 'describes a simple entity',
        'version': 0,
        'disableKeyCompression': true,
        'type': 'object',
        'properties': {
            'id': {
                'type': 'string',
                'primary': true,
                'default': ''
            },
            'name': {
                'type': 'string',
                'default': ''
            },
            'address': {
                'type': 'string',
            },
            'taxId': {
                'type': 'string',
            },
        },
        'required': ['name']
    };

    constructor(private dbService: RxDBService) {
        this.dbService.addCollection('entity', EntityRepository.schema);
    }

    public async findOne(id: string): Promise<Entity> {
        const db: RxEntityDatabase = <RxEntityDatabase> await this.dbService.get();

        return db.entity
            .findOne({id: {$eq: id}})
            .exec();
    }

    public async findAll(): Promise<Array<Entity>> {
        const db: RxEntityDatabase = <RxEntityDatabase> await this.dbService.get();

        return db.entity
            .find()
            .exec();
    }

    public async delete(id: string): Promise<boolean> {
        const db: RxEntityDatabase = <RxEntityDatabase> await this.dbService.get();

        const entity: RxEntityDocument = await db.entity
            .findOne({id: {$eq: id}})
            .exec();

        return entity.remove();
    }

    public async upsert(entity: Entity): Promise<Entity> {
        const db: RxEntityDatabase = <RxEntityDatabase> await this.dbService.get();

        return db.entity.upsert({
            id: entity.id ? entity.id : UUID.UUID(),
            name: entity.name,
            address: entity.address,
            taxId: entity.taxId,
        });
    }
}
