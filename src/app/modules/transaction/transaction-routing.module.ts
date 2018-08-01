import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ListComponent} from './components/list/list.component';
import {ViewComponent} from './components/view/view.component';

const routes: Routes = [
    {path: 'transaction', component: ListComponent, data: {page: 'transaction'}},
    {path: 'transaction/create', component: ViewComponent, data: {page: 'transaction/create'}},
    {path: 'transaction/:id', component: ViewComponent, data: {page: 'transaction/edit'}}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionRoutingModule {
}
