import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { animate, style, transition, trigger, stagger, query } from '@angular/animations';

import { ITheme, IUser } from 'src/app/core/interfaces';
import { AuthService } from 'src/app/auth.service';

@Component({
    selector: 'app-theme-list-item',
    templateUrl: './theme-list-item.component.html',
    styleUrls: [ './theme-list-item.component.scss' ],
    animations: [
        trigger('fade', [
            transition('void => *', [
                query(':enter', [
                    style({ opacity: 0, transform: 'translateY(-100px)' }),
                    stagger('300ms', [
                        animate('0.8s cubic-bezier(0.35, 0, 0.25, 1)'),
                        style({ opacity: 1, transform:'none' })
                    ])
                ], { optional: true })
            ]),
        ])
    ]
})
export class ThemeListItemComponent implements OnChanges, OnInit {

    isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$

    canSubscribe$: Observable<boolean>;

    user$: Observable<IUser>;

    isOwner: boolean = false;

    @Input() theme: ITheme;

    constructor(private authService: AuthService) { }

    ngOnChanges(): void {
        this.canSubscribe$ = this.authService.user$.pipe(map(currentUser => {
            if (!currentUser || !this.theme) {
                return false;
            }
            return !this.theme.subscribers.includes(currentUser._id);
        }));
    }

    ngOnInit(): void {
        this.user$ = this.authService.user$.pipe(
            map(currentUser => {   
                return currentUser;
            })
        )
    }
}