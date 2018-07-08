import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {LayoutModule} from './modules/layout/layout.module';
import {HomepageModule} from './modules/homepage/homepage.module';
import {HistoryModule} from './modules/history/history.module';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        LayoutModule,
        HomepageModule,
        HistoryModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
