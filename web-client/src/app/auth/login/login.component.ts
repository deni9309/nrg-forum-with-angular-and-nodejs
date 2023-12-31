import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, query, stagger, state, style, transition, trigger, useAnimation } from '@angular/animations';

import { emailValidator } from '../validators/emailValidator';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants/validation-constants';
import { AuthService } from 'src/app/auth.service';
import { MessageBusService } from 'src/app/core/message-bus.service';
import { MessageType } from 'src/app/shared/constants/messageType';
import { slideInX, slideOutX } from 'src/app/shared/animations/slide-x.animation';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ],
    animations: [
        trigger('fade', [
            state('void', style({ opacity: 0 })),
            transition('void => *', [
                animate(1000)
            ]),
        ]),

        trigger('slide', [
            state('void', style({ opacity: 0 })),
            transition(':enter', useAnimation(slideInX)),
            transition(':leave', useAnimation(slideOutX))
        ])
    ]
})
export class LoginComponent {
    errorMessage: string = '';

    form: FormGroup = this.fb.group({
        email: [ '', [ Validators.required, emailValidator(DEFAULT_EMAIL_DOMAINS) ] ],
        password: [ '', [ Validators.required, Validators.minLength(5) ] ]
    });

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private messageBus: MessageBusService
    ) { }

    loginHandler(): void {
        if (this.form.invalid) { return; }
        this.errorMessage = '';
        const { email, password } = this.form.value;

        this.authService.login$({ email, password }).subscribe({
            next: () => {
                if (this.activatedRoute.snapshot.queryParams[ 'redirect-to' ]) {
                    this.router.navigateByUrl(this.activatedRoute.snapshot.queryParams[ 'redirect-to' ]);
                } else {
                    this.router.navigate([ '/home' ]);
                }

                this.messageBus.notifyForMessage({ text: 'Successfully logged in!', type: MessageType.Success });
            },
            complete: () => {
                console.log('Login stream completed');
            },
            error: (res) => {
                this.errorMessage = res.error.message;
            }
        });
    }
}
