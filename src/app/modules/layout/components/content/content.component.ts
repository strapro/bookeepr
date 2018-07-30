import {Component, OnInit} from '@angular/core';
import {
    transition,
    trigger,
    query,
    style,
    animate,
    group,
    animateChild
} from '@angular/animations';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.less'],
    animations: [
        trigger('animRoutes', [
            transition('* <=> *', [
                group([
                    query(
                        ':enter',
                        [
                            style({
                                opacity: 0,
                                transform: 'translateY(3rem)'
                            }),
                            animate(
                                '0.2s ease-out',
                                style({ opacity: 1, transform: 'translateY(0)' })
                            ),
                            animateChild()
                        ],
                        { optional: true }
                    ),
                    query(
                        ':leave',
                        [animate('0.2s', style({ opacity: 0 })), animateChild()],
                        { optional: true }
                    )
                ])
            ])
        ])
    ]
})
export class ContentComponent implements OnInit {

    constructor() {
    }

    getPage(outlet) {
        return outlet.activatedRouteData['page'] || 'one';
    }

    ngOnInit() {
    }
}
