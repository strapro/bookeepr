import {Component, OnInit} from '@angular/core';
import {TagRepository} from '../../../../services/repositories/tag.repository';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.less']
})
export class HistoryComponent implements OnInit {

    constructor(private tagRepository: TagRepository) {
    }

    ngOnInit() {
        this.tagRepository.findAll()
            .then((res) => {
                console.log(res);
            });
    }

}
