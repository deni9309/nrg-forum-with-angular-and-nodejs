import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, mergeMap, tap } from 'rxjs';

import { IPost, ITheme, IUser } from 'src/app/core/interfaces';
import { ThemeService } from '../../../core/theme.service';
import { AuthService } from 'src/app/auth.service';
import { MessageBusService } from 'src/app/core/message-bus.service';
import { MessageType } from 'src/app/shared/constants/messageType';

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
        private authService: AuthService,
        private messageBus: MessageBusService,
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
        if (this.currentUser?._id !== (this.theme.userId).toString()) {

            this.themeService.subscribeToTheme$(this.theme._id).subscribe(updatedTheme => {
                this.theme = updatedTheme;
                this.canSubscribe = false;
            });
        } else {
            this.messageBus.notifyForMessage({ text: 'You can not subscribe to your own themes.', type: MessageType.Error })
        }
    }

    unsubscribe() {
        if (this.currentUser?._id !== (this.theme.userId).toString()) {
            
            this.themeService.unsubscribeFromTheme$(this.theme._id).subscribe(updatedTheme => {
                this.theme = updatedTheme;
                this.canSubscribe = true;
            });
        } else {
            this.messageBus.notifyForMessage({ text: 'You can not unsubscribe from your own themes.', type: MessageType.Error })
        }
    }

    canLikeThemePost(post: IPost): boolean {
        return this.currentUser && !post.likes.includes(this.currentUser._id);
    }
 
    like() {
        
    }

    dislike() {
        
    }

}

