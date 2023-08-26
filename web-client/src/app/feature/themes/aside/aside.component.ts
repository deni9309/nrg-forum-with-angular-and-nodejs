import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
    selector: 'app-aside',
    templateUrl: './aside.component.html',
    styleUrls: [ './aside.component.scss' ],
    animations: [
        trigger('fade', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate(1200) ])
        ])
    ]
})
export class AsideComponent {

}
