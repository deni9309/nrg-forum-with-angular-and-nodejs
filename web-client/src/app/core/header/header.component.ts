import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Observable, Subscription } from 'rxjs';

import { IUser } from '../interfaces';
import { AuthService } from 'src/app/auth.service';
import { MessageBusService } from '../message-bus.service';
import { MessageType } from 'src/app/shared/constants/messageType';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.scss' ],
    animations: [
        trigger('fade', [
            state('void', style({ opacity: 0 })),

            transition('void => *', [
                animate(1000)
            ]),

            transition('* => void', [
                animate(400)
            ])
        ]),

        trigger('navOptionsBackground', [
            state('DEFAULT', style('*')),
            state('ACTIVE', style({ backgroundColor: 'orange' })),
            transition('* => *', animate('300ms ease-in-out')),
        ]),
    ]
})
export class HeaderComponent implements OnInit, OnDestroy {
    currentUser$: Observable<IUser> = this.authService.user$;

    isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

    message: string;
    isErrorMessage: boolean;

    private isLoggingOut: boolean = false;
    private subscription: Subscription = new Subscription();

    constructor(
        public authService: AuthService,
        private router: Router,
        private messageBus: MessageBusService
    ) { }

    ngOnInit(): void {
        this.subscription = this.messageBus.onNewMessage$.subscribe(msg => {
            this.message = msg?.text || '';
            this.isErrorMessage = msg?.type === MessageType.Error;

            if (this.message) {
                setTimeout(() => { this.messageBus.clear() }, 5000);
            }
        });
    }

    logoutHandler(): void {
        if (this.isLoggingOut) { return; }
        this.isLoggingOut = true;

        this.authService.logout$().subscribe({
            complete: () => {
                this.isLoggingOut = false;
                this.router.navigate([ '/home' ]);
            },
            error: () => {
                this.isLoggingOut = false;
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
