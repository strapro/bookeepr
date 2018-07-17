import {Injectable} from '@angular/core';

import {RxCollection, RxDatabase, RxDocument, RxJsonSchema} from 'rxdb';
import {Observable} from 'rxjs/Observable';

import {UUID} from 'angular2-uuid';

import {RxDBService} from '../database/rxdb.service';
import {Tag} from '../../domain/tag';

type RxTagDocument = RxDocument<Tag>;

declare class RxTagCollection extends RxCollection<Tag> {
    pouch: any;
}

class RxTagDatabase extends RxDatabase {
    tag?: RxTagCollection;
}

@Injectable()
export class TagRepository {
    static schema: RxJsonSchema = {
        'title': 'Tag',
        'description': 'describes a simple tag',
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
            'color': {
                'type': 'string',
            },
        },
        'required': ['name']
    };

    constructor(private dbService: RxDBService) {
        this.dbService.addCollection('tag', TagRepository.schema);
    }

    public async findOne(id: string): Promise<Tag> {
        const db: RxTagDatabase = <RxTagDatabase> await this.dbService.get();

        return db.tag
            .findOne({id: {$eq: id}})
            .exec();
    }

    public async findAll$(): Promise<Observable<Array<Tag>>> {
        const db: RxTagDatabase = <RxTagDatabase> await this.dbService.get();

        return db.tag
            .find()
            .$;
    }

    public async delete(id: string): Promise<boolean> {
        const db: RxTagDatabase = <RxTagDatabase> await this.dbService.get();

        const tag: RxTagDocument = await db.tag
            .findOne({id: {$eq: id}})
            .exec();

        return tag.remove();
    }

    public async upsert(tag: Tag): Promise<Tag> {
        const db: RxTagDatabase = <RxTagDatabase> await this.dbService.get();

        return db.tag.upsert({
            id: tag.id ? tag.id : UUID.UUID(),
            name: tag.name,
            color: tag.color,
        });
    }
}
