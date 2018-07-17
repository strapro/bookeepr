import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd, ActivationEnd} from '@angular/router';

import {MenuItem} from 'primeng/api';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {
    items: Array<MenuItem>;
    multiple: boolean = false;

    constructor(private router: Router) {
        router.events.subscribe(event => {
            if (event instanceof ActivationEnd) {
                this.autoExpandFromChildRoutes(event.snapshot.routeConfig.path);
            }
        });
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
                icon: 'fa fa-tags',
                items: [
                    {
                        label: 'List',
                        routerLink: ['tag'],
                        routerLinkActiveOptions: {
                            exact: true
                        },
                    },
                    {
                        label: 'New',
                        routerLink: ['tag/create'],
                        routerLinkActiveOptions: {
                            exact: true
                        },
                    },
                    {
                        label: 'Edit',
                        routerLink: ['tag/:id'],
                        visible: false,
                        routerLinkActiveOptions: {
                            exact: true
                        },
                    },
                ]
            }
        ];
    }

    private autoExpandFromChildRoutes(url: string): void {
        this.items.forEach((item: MenuItem) => {
            if (item.items) {
                const children: Array<MenuItem> = <Array<MenuItem>> item.items;
                const matchedChild: MenuItem = children.find((child: MenuItem) => {
                    return child.routerLink && child.routerLink[0] === url;
                });

                item.expanded = !!matchedChild;
            }

            item.expanded = item.expanded || (item.routerLink && item.routerLink[0] === url);
        });
    }
}
