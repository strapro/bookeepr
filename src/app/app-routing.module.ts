import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', loadChildren: './modules/homepage/homepage.module#HomepageModule'},
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
