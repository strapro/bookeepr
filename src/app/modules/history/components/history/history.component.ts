import {Component, NgZone, OnInit} from '@angular/core';
import {TagRepository} from '../../../../services/repositories/tag.repository';
import {Tag} from '../../../../domain/tag';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.less']
})
export class HistoryComponent implements OnInit {

    public tags: Array<Tag>;
    private tags$: Observable<Array<Tag>>;

    constructor(private tagRepository: TagRepository, private zone: NgZone) {
    }

    ngOnInit() {
        this.getData();
    }

    private async getData() {
        this.tags$ = await this.tagRepository.findAll();
        this.tags$.subscribe( (tags: Array<Tag>) => {
            this.tags = tags;
            this.zone.run(() => { });
        })
    }



}
