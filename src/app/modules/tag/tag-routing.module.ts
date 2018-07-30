import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ListComponent} from './components/list/list.component';
import {ViewComponent} from './components/view/view.component';

const routes: Routes = [
    {path: 'tag', component: ListComponent, data: {page: 'tag'}},
    {path: 'tag/create', component: ViewComponent, data: {page: 'tag/create'}},
    {path: 'tag/:id', component: ViewComponent, data: {page: 'tag/edit'}}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TagRoutingModule {
}
