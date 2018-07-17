import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {TagRepository} from '../../../../services/repositories/tag.repository';
import {Tag} from '../../../../domain/tag';

@Component({
    selector: 'app-tag-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.less']
})
export class ViewComponent implements OnInit, OnDestroy {

    public initialized: Promise<boolean>;
    public id: string;
    public tag: Tag;

    constructor(private tagRepository: TagRepository, private route: ActivatedRoute) {
        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.initialized = this.getData();
    }

    ngOnDestroy() {
        this.initialized = Promise.resolve(false);
    }

    public async save() {
        this.tag = await this.tagRepository.upsert(this.tag);

        return true;
    }

    private async getData() {
        if (this.id) {
            this.tag = await this.tagRepository.findOne(this.id);
        } else {
            this.tag = await Promise.resolve({
                id: null,
                name: '',
                color: '#FFFFFF',
            });
        }

        return true;
    }

}
