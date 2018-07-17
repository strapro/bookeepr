import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';

import {TagRoutingModule} from './tag-routing.module';
import {ListComponent} from './components/list/list.component';
import {ViewComponent} from './components/view/view.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        InputTextModule,
        ColorPickerModule,
        CardModule,
        ButtonModule,
        TagRoutingModule,
    ],
    declarations: [ListComponent, ViewComponent]
})
export class TagModule {
}
