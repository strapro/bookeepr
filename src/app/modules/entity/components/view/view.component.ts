import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/components/common/messageservice';

import {EntityRepository} from '../../../../services/repositories/entity.repository';
import {Entity} from '../../../../domain/entity';

@Component({
    selector: 'app-entity-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.less']
})
export class ViewComponent implements OnInit {

    public id: string;
    public entity: Entity;

    private deleteConfirmHeader: string = 'Delete entity';
    private deleteConfirmMessage: string = 'Are you sure that you want to delete this entity?';
    private deletedMessageHeader: string = 'Entity deleted';
    private deletedMessageDetails: string = 'Entity deleted successfully';
    private updatedMessageHeader: string = 'Entity updated';
    private updatedMessageDetails: string = 'Entity updated successfully';
    private createdMessageHeader: string = 'Entity created';
    private createdMessageDetails: string = 'Entity created successfully';

    constructor(private router: Router,
                private route: ActivatedRoute,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private entityRepository: EntityRepository) {
        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.getData();
    }

    public async save() {
        await this.entityRepository.upsert(this.entity);

        this.messageService.add({
            severity: 'success',
            summary: this.entity.id ? this.updatedMessageHeader : this.createdMessageHeader,
            detail: this.entity.id ? this.updatedMessageDetails : this.createdMessageDetails,
        });

        this.router.navigate(['entity']);
    }

    public delete() {
        this.confirmationService.confirm({
            message: this.deleteConfirmMessage,
            header: this.deleteConfirmHeader,
            accept: async () => {
                await this.entityRepository.delete(this.entity.id);

                this.messageService.add({
                    severity: 'success',
                    summary: this.deletedMessageHeader,
                    detail: this.deletedMessageDetails
                });

                this.router.navigate(['entity']);
            }
        });
    }

    private async getData() {
        if (this.id) {
            this.entity = await this.entityRepository.findOne(this.id);
        } else {
            this.entity = await Promise.resolve({
                id: null,
                name: '',
                address: '',
                taxId: '',
            });
        }
    }
}
