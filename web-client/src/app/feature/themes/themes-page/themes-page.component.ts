import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth.service';

@Component({
    selector: 'app-themes-page',
    templateUrl: './themes-page.component.html',
    styleUrls: [ './themes-page.component.scss' ],
    animations: [
        trigger('fade', [
            state('void', style({ opacity: 0 })),
            transition('void <=> *', [
                animate(1200)
            ])
        ])
    ]
})
export class ThemesPageComponent {
    isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

    constructor(private authService: AuthService) { }
}
