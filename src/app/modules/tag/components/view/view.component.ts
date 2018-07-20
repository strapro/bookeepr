import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/components/common/messageservice';

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

    private deleteConfirmHeader: string = 'Delete tag';
    private deleteConfirmMessage: string = 'Are you sure that you want to delete this tag?';
    private deletedMessageHeader: string = 'Tag deleted';
    private deletedMessageDetails: string = 'Tag deleted successfully';
    private updatedMessageHeader: string = 'Tag updated';
    private updatedMessageDetails: string = 'Tag updated successfully';
    private createdMessageHeader: string = 'Tag created';
    private createdMessageDetails: string = 'Tag created successfully';

    constructor(private router: Router,
                private route: ActivatedRoute,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private tagRepository: TagRepository) {
        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.getData();
    }

    public async save() {
        await this.tagRepository.upsert(this.tag);

        this.messageService.add({
            severity: 'success',
            summary: this.tag.id ? this.updatedMessageHeader : this.createdMessageHeader,
            detail: this.tag.id ? this.updatedMessageDetails : this.createdMessageDetails,
        });

        this.router.navigate(['tag']);
    }


    public delete() {
        this.confirmationService.confirm({
            message: this.deleteConfirmMessage,
            header: this.deleteConfirmHeader,
            accept: async () => {
                await this.tagRepository.delete(this.tag.id);

                this.messageService.add({
                    severity: 'success',
                    summary: this.deletedMessageHeader,
                    detail: this.deletedMessageDetails
                });

                this.router.navigate(['tag']);
            }
        });
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
