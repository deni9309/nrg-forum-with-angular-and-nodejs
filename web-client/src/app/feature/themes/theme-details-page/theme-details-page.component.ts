import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map, mergeMap, take, tap } from 'rxjs';

import { IPost, ITheme, IUser } from 'src/app/core/interfaces';
import { ThemeService } from '../../../core/theme.service';
import { AuthService } from 'src/app/auth.service';

@Component({
    selector: 'app-theme-details-page',
    templateUrl: './theme-details-page.component.html',
    styleUrls: [ './theme-details-page.component.scss' ]
})
export class ThemeDetailsPageComponent implements OnInit {
    theme: ITheme<IPost>;

    isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
    canSubscribe: boolean = false;
    currentUser?: IUser;

    constructor(
        private activatedRoute: ActivatedRoute,
        private themeService: ThemeService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        combineLatest([
            this.activatedRoute.params.pipe(
                mergeMap(params => {
                    const themeId = params[ 'themeId' ];
                    return this.themeService.loadThemeById(themeId);
                })),

            this.authService.user$.pipe(tap(user => {
                this.currentUser = user
            }))
        ])
            .subscribe(([ theme, user ]) => {
                this.theme = theme;
                this.canSubscribe = user && !this.theme.subscribers.includes(user?._id);
            });
    }

    subscribe() {

    }

    unsubscribe() {

    }
    
    canLike(comment: IPost): boolean {
        return this.currentUser && !comment.likes.includes(this.currentUser._id);
    }

  
}

