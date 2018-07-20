import {Component, OnInit} from '@angular/core';

import {ConfirmationService} from 'primeng/api';

import {RxDBService} from './services/database/rxdb.service';
import {TagRepository} from './services/repositories/tag.repository';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    providers: [
        ConfirmationService,
        RxDBService,
        TagRepository
    ]
})
export class AppComponent implements OnInit {
    ngOnInit() {

    }
}

