import {Component, OnInit} from '@angular/core';

import {MenuItem} from 'primeng/api';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

    items: MenuItem[];
    multiple: boolean = false;

    constructor() {
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Dashboard',
                icon: 'fa fa-home',
                routerLink: [''],
                routerLinkActiveOptions: {
                    exact: true
                }
            },
            {
                label: 'History',
                icon: 'fa fa-list-ul',
                routerLink: ['/history'],
                routerLinkActiveOptions: {
                    exact: true
                },
                items: [
                    {label: 'Omega'},
                ]
            },
            {
                label: 'Tag manager',
                icon: 'fa fa-tags'
            }
        ];
    }

}
