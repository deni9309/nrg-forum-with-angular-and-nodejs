import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: [ './welcome.component.scss' ]
})
export class WelcomeComponent implements OnInit, OnDestroy {
    isLoggedIn: boolean;

    private subscription: Subscription = new Subscription();

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.subscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {  //can use   this.subscription.add(this.authService.isLoggedIn$.subscribe(isLoggedIn => {//do something }));
            this.isLoggedIn = isLoggedIn;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
