import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {MenubarModule} from 'primeng/menubar';
import {PanelMenuModule} from 'primeng/panelmenu';
import {ButtonModule} from 'primeng/button';

import {ContentComponent} from './components/content/content.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {TopbarComponent} from './components/topbar/topbar.component';

@NgModule({
    imports: [
        RouterModule,
        MenubarModule,
        PanelMenuModule,
        ButtonModule
    ],
    declarations: [
        ContentComponent,
        SidebarComponent,
        TopbarComponent
    ],
    exports: [
        ContentComponent,
        SidebarComponent,
        TopbarComponent
    ]
})
export class LayoutModule {
}
