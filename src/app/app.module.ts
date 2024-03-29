import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';

import {GrowlModule} from 'primeng/growl';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LayoutModule} from './modules/layout/layout.module';
import {HomepageModule} from './modules/homepage/homepage.module';
import {TagModule} from './modules/tag/tag.module';
import {EntityModule} from './modules/entity/entity.module';
import {TransactionModule} from './modules/transaction/transaction.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        GrowlModule,
        AppRoutingModule,
        LayoutModule,
        HomepageModule,
        TagModule,
        EntityModule,
        TransactionModule,
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: PathLocationStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
