import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';

import {HomepageComponent} from './components/homepage/homepage.component'
import {HomepageRoutingModule} from './homepage-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        DialogModule,
        HomepageRoutingModule,
    ],
    declarations: [
        HomepageComponent
    ]
})
export class HomepageModule {
}
