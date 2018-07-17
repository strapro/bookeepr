import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ListComponent} from './components/list/list.component';

const routes: Routes = [
    {path: 'tags', component: ListComponent, data: {page: 'tags'}}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TagRoutingModule {
}
