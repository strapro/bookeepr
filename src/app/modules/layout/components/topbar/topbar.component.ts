import {Component, OnInit} from '@angular/core';

import {MenuItem} from 'primeng/api';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.less']
})
export class TopbarComponent implements OnInit {

    items: MenuItem[];
    autoDisplay: boolean = true;

    constructor() {
    }

    ngOnInit() {
        this.items = [
            {
                label: 'GET STARTED'
            },
            {
                label: 'THEMES',
                items: [
                    {label: 'Omega'},
                ]
            },
            {
                label: 'SUPPORT'
            }
        ];
    }
}
