import {Component, OnInit} from '@angular/core';

import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/components/common/messageservice';

import {RxDBService} from './services/database/rxdb.service';
import {TagRepository} from './services/repositories/tag.repository';
import {EntityRepository} from './services/repositories/entity.repository';
import {TransactionRepository} from './services/repositories/transaction.repository';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    providers: [
        ConfirmationService,
        MessageService,
        RxDBService,
        TagRepository,
        EntityRepository,
        TransactionRepository,
    ]
})
export class AppComponent implements OnInit {

    constructor(private rxDBService: RxDBService,
                private tagRepository: TagRepository,
                private entityRepository: EntityRepository,
                private transactionRepository: TransactionRepository,) {
        rxDBService.get();
    }
    ngOnInit() {

    }
}

