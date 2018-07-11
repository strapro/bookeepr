import {Injectable} from '@angular/core';

import {RxCollection, RxDatabase, RxDocument, RxJsonSchema} from 'rxdb';

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

    public async findAll() {
        const db: RxTagDatabase = <RxTagDatabase> await this.dbService.get(),
            tags: Array<RxTagDocument> = await db.tag
                .find()
                .exec();

        return tags;
    }
}
