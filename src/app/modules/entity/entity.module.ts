import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {ConfirmDialogModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';

import {EntityRoutingModule} from './entity-routing.module';
import {ListComponent} from './components/list/list.component';
import {ViewComponent} from './components/view/view.component';

@NgModule({
    imports: [
        CommonModule,
        EntityRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        CardModule,
        ConfirmDialogModule,
        InputTextModule,
        TableModule,
    ],
    declarations: [ListComponent, ViewComponent]
})
export class EntityModule {
}
