import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ThemeService } from 'src/app/core/theme.service';

@Component({
  selector: 'app-theme-new-page',
  templateUrl: './theme-new-page.component.html',
    styleUrls: [ './theme-new-page.component.scss' ],
    animations: [
        trigger('fade', [
            state('void', style({ opacity: 0 })),
            transition('void => *', [      
                animate(900)
            ]),       
        ]),
        trigger('slide', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateX(10%)' }),
                animate('700ms 900ms ease-out', style({ opacity: 1, transform: 'none' }))
            ]),
            transition(':leave', [
                animate('700ms ease', style({ opacity: 0, transform: 'translateX(10%)' }))
            ])
        ])
    ]
})
export class ThemeNewPageComponent {
    errorMessage: string = '';

    constructor(private themeService:ThemeService, private router: Router) { }

    submitNewThemeHandler(form: NgForm) {
        if (form.invalid) { return; }
        this.errorMessage = '';

        const { themeName, postText } = form.value;

        this.themeService.createTheme$({ themeName, postText }).subscribe({
            next: () => {
                this.router.navigate([ '/themes' ])
            },
            error: (res) => {
                this.errorMessage = res.error.message;
            }
        });
    }

    navigateToHomeHandler(): void {
        this.router.navigate([ '/themes' ]);
    }
}
