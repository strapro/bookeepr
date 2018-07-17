import {Component, OnDestroy, OnInit} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {TagRepository} from '../../../../services/repositories/tag.repository';
import {Tag} from '../../../../domain/tag';

@Component({
    selector: 'app-tag-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit, OnDestroy {

    public initialized: Promise<boolean>;
    public cols: any[];
    public selected: Tag;
    public tags$: Observable<Array<Tag>> = null;

    constructor(private tagRepository: TagRepository) {
    }

    ngOnInit() {
        this.cols = [
            {field: 'color', header: 'Color', width: '70px'},
            {field: 'name', header: 'Name', width: 'auto'},
        ];

        setTimeout(() => {
            this.initialized = this.getData();
        }, 300)

    }

    ngOnDestroy() {
        this.initialized = Promise.resolve(false);
    }

    public onRowSelect(event) {

    }

    private async getData() {
        this.tags$ = await this.tagRepository.findAll();

        return true;
    }
}
