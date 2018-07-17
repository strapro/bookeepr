import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TableModule} from 'primeng/table';

import {TagRoutingModule} from './tag-routing.module';
import {ListComponent} from './components/list/list.component';


@NgModule({
    imports: [
        CommonModule,
        TagRoutingModule,
        TableModule,
    ],
    declarations: [ListComponent]
})
export class TagModule {
}
