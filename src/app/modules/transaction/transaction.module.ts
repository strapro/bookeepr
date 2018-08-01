import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {ConfirmDialogModule} from 'primeng/primeng';
import {ColorPickerModule} from 'primeng/colorpicker';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';

import {TransactionRoutingModule} from './transaction-routing.module';
import {ListComponent} from './components/list/list.component';
import {ViewComponent} from './components/view/view.component';

@NgModule({
    imports: [
        CommonModule,
        TransactionRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        CardModule,
        ConfirmDialogModule,
        ColorPickerModule,
        InputTextModule,
        TableModule,
    ],
    declarations: [ListComponent, ViewComponent]
})
export class TransactionModule {
}
