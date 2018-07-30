import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {TagRepository} from '../../../../services/repositories/tag.repository';
import {Tag} from '../../../../domain/tag';

@Component({
    selector: 'app-tag-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

    public cols: any[];
    public selected: Tag;
    public tags: Promise<Array<Tag>>;

    constructor(private router: Router, private tagRepository: TagRepository) {
    }

    ngOnInit() {
        this.cols = [
            {field: 'color', header: 'Color', width: '70px'},
            {field: 'name', header: 'Name', width: 'auto'}
        ];

        this.getData();
    }

    public async edit(event) {
        this.router.navigate(['tag/', event.data.id]);
    }

    private async getData() {
        this.tags = this.tagRepository.findAll();
    }
}
