import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ListComponent} from './components/list/list.component';
import {ViewComponent} from './components/view/view.component';

const routes: Routes = [
    {path: 'entity', component: ListComponent, data: {page: 'entity'}},
    {path: 'entity/create', component: ViewComponent, data: {page: 'entity/create'}},
    {path: 'entity/:id', component: ViewComponent, data: {page: 'entity/edit'}}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EntityRoutingModule {
}
