import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {TagRepository} from '../../../../services/repositories/tag.repository';
import {Tag} from '../../../../domain/tag';

@Component({
    selector: 'app-tag-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.less']
})
export class ViewComponent implements OnInit {

    public id: string;
    public tag: Tag;

    constructor(private tagRepository: TagRepository, private router: Router, private route: ActivatedRoute) {
        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.getData();
    }

    public async save() {
        await this.tagRepository.upsert(this.tag);

        this.router.navigate(['tag']);
    }

    public async delete() {
        await this.tagRepository.delete(this.tag.id);

        this.router.navigate(['tag']);
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
    }

}
