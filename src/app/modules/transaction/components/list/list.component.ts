import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Transaction} from '../../../../domain/transaction';
import {TransactionRepository} from '../../../../services/repositories/transaction.repository';
import {TransactionType} from '../../../../domain/transaction_type';

@Component({
    selector: 'app-transaction-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

    public cols: any[];
    public selected: Transaction;
    public transactions: Promise<Array<Transaction>>;
    public transactionTypes: typeof TransactionType = TransactionType;

    constructor(private router: Router, private transactionRepository: TransactionRepository) {
    }

    ngOnInit() {
        this.cols = [
            {field: 'type', header: 'Type', width: '100px'},
            {field: 'amount', header: 'Amount', width: '100px'},
            {field: 'vat', header: 'Vat', width: '50px'},
            {field: 'date', header: 'Date', width: '100px'},
            {field: 'entity', header: 'Entity', width: '300px'},
            {field: 'tags', header: 'Tags', width: 'auto'},
            {field: 'comments', header: 'Comments', width: 'auto'},
        ];

        this.getData();
    }

    public async edit(event) {
        this.router.navigate(['transaction/', event.data.id]);
    }

    private async getData() {
        this.transactions = this.transactionRepository.findAll();
    }
}
