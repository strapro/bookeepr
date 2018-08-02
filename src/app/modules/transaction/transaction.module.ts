import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {AutoCompleteModule} from 'primeng/autocomplete';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {ConfirmDialogModule} from 'primeng/primeng';
import {ColorPickerModule} from 'primeng/colorpicker';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {KeyFilterModule} from 'primeng/keyfilter';
import {RadioButtonModule} from 'primeng/radiobutton';
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
        AutoCompleteModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        ConfirmDialogModule,
        ColorPickerModule,
        DropdownModule,
        InputTextareaModule,
        KeyFilterModule,
        RadioButtonModule,
        TableModule,
    ],
    declarations: [ListComponent, ViewComponent]
})
export class TransactionModule {
}
