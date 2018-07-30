import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Entity} from '../../../../domain/entity';
import {EntityRepository} from '../../../../services/repositories/entity.repository';

@Component({
    selector: 'app-entity-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

    public cols: any[];
    public selected: Entity;
    public entities: Promise<Array<Entity>>;

    constructor(private router: Router, private entityRepository: EntityRepository) {
    }

    ngOnInit() {
        this.cols = [
            {field: 'name', header: 'Name', width: '350px'},
            {field: 'address', header: 'Address', width: 'auto'},
            {field: 'taxId', header: 'Tax ID', width: '200px'},
        ];

        this.getData();
    }

    public async edit(event) {
        this.router.navigate(['entity/', event.data.id]);
    }

    private async getData() {
        this.entities = this.entityRepository.findAll();
    }
}
