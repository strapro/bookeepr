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
                routerLink: [''],
                routerLinkActiveOptions: {
                    exact: true
                }
            },
            {
                label: 'History',
                routerLink: ['/history'],
                routerLinkActiveOptions: {
                    exact: true
                },
                items: [
                    {label: 'Omega'},
                ]
            },
            {
                label: 'Tag manager'
            }
        ];
    }

}
