import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {LayoutModule} from './modules/layout/layout.module';
import {HomepageModule} from './modules/homepage/homepage.module';
import {HistoryModule} from './modules/history/history.module';
import {TagModule} from './modules/tag/tag.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        LayoutModule,
        HomepageModule,
        HistoryModule,
        TagModule
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
