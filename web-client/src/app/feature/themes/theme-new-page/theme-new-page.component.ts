import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/core/theme.service';

@Component({
  selector: 'app-theme-new-page',
  templateUrl: './theme-new-page.component.html',
  styleUrls: ['./theme-new-page.component.scss']
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
