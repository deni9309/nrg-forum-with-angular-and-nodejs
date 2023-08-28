import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
    selector: 'app-not-found-page',
    templateUrl: './not-found-page.component.html',
    styleUrls: [ './not-found-page.component.scss' ],
    animations: [
        trigger('fade', [
            state('void', style({ opacity: 0 })),
            transition('void => *', [
                animate(1000)
            ]),
        ]),
        trigger('slide', [
            transition('void => *', [
                query('p', style({ opacity: 0, transform: 'translateX(-100%)' }), { optional: true }),
                query('p', stagger(30, [
                    animate('700ms .1s ease-in', keyframes([
                        style({ opacity: 1, transform: 'none', offset: 1 })
                    ]))
                ]), { optional: true })
            ])
        ])
    ]
})
export class NotFoundPageComponent {

}
