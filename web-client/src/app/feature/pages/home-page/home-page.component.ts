import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
    styleUrls: [ './home-page.component.scss' ],
    animations: [
        trigger('fade', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate(1200) ])
        ]),
        trigger('slide', [
            transition('void => *', [
                query('.hero', [
                    style({ opacity: 0, transform: 'translateY(-100px)' }),
                    stagger('300ms', [
                        animate('0.8s cubic-bezier(0.35, 0, 0.25, 1)'),
                        style({ opacity: 1, transform: 'none' })
                    ])
                ], { optional: true })
            ]),
        ])
    ]
})
export class HomePageComponent {

}
