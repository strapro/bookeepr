import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/components/common/messageservice';

import {TransactionRepository} from '../../../../services/repositories/transaction.repository';
import {Transaction} from '../../../../domain/transaction';
import {EntityRepository} from '../../../../services/repositories/entity.repository';
import {Entity} from '../../../../domain/entity';
import {TagRepository} from '../../../../services/repositories/tag.repository';
import {Tag} from '../../../../domain/tag';
import {TransactionType} from '../../../../domain/transaction_type';

@Component({
    selector: 'app-transaction-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.less']
})
export class ViewComponent implements OnInit {

    public id: string;
    public transaction: Transaction;
    public transactionTypes: typeof TransactionType = TransactionType;
    public tags: Array<Tag> = [];
    public filteredTags: Array<Tag> = [];
    public entities: Array<Entity> = [];

    private deleteConfirmHeader: string = 'Delete transaction';
    private deleteConfirmMessage: string = 'Are you sure that you want to delete this transaction?';
    private deletedMessageHeader: string = 'Transaction deleted';
    private deletedMessageDetails: string = 'Transaction deleted successfully';
    private updatedMessageHeader: string = 'Transaction updated';
    private updatedMessageDetails: string = 'Transaction updated successfully';
    private createdMessageHeader: string = 'Transaction created';
    private createdMessageDetails: string = 'Transaction created successfully';

    constructor(private router: Router,
                private route: ActivatedRoute,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private transactionRepository: TransactionRepository,
                private entityRepository: EntityRepository,
                private tagRepository: TagRepository) {
        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.getData();
    }

    public async save() {
        await this.transactionRepository.upsert(this.transaction);

        this.messageService.add({
            severity: 'success',
            summary: this.transaction.id ? this.updatedMessageHeader : this.createdMessageHeader,
            detail: this.transaction.id ? this.updatedMessageDetails : this.createdMessageDetails,
        });

        this.router.navigate(['transaction']);
    }

    public delete() {
        this.confirmationService.confirm({
            message: this.deleteConfirmMessage,
            header: this.deleteConfirmHeader,
            accept: async () => {
                await this.transactionRepository.delete(this.transaction.id);

                this.messageService.add({
                    severity: 'success',
                    summary: this.deletedMessageHeader,
                    detail: this.deletedMessageDetails
                });

                this.router.navigate(['transaction']);
            }
        });
    }

    public tagSearch(event) {
        this.filteredTags = this.tags.filter((tag => {
            return tag.name.toLowerCase().indexOf(event.query.toLowerCase()) > -1;
        }));
    }

    private async getData() {
        this.entities = await this.entityRepository.findAll();
        this.tags = await this.tagRepository.findAll();

        if (this.id) {
            this.transaction = await this.transactionRepository.findOne(this.id);
        } else {
            this.transaction = await Promise.resolve({
                id: null,
                type: TransactionType.Expense,
                amount: null,
                vat: null,
                date: new Date(),
                entity: null,
                tags: [],
                comments: '',
            });
        }
    }
}
