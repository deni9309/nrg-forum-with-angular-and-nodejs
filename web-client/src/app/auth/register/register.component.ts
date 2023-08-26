import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { emailValidator } from '../validators/emailValidator';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants/validation-constants';
import { matchPasswordsValidator } from '../validators/matchPasswordsValidator';
import { CreateUserDto } from 'src/app/core/interfaces';
import { AuthService } from 'src/app/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: [ './register.component.scss' ],
    animations: [
        trigger('fade', [
            state('void', style({ opacity: 0 })),
            transition('void <=> *', [
                animate(900)
            ]),
        ])
    ]
})
export class RegisterComponent {
    // validDomains = DEFAULT_EMAIL_DOMAINS; use when working with template driven forms

    get getPass(): FormControl {
        return this.form.controls[ 'passGroup' ].get('password') as FormControl;
    }
    get getRePass(): FormControl {
        return this.form.controls[ 'passGroup' ].get('rePassword') as FormControl;
    }

    form: FormGroup = this.fb.group({
        username: [ '', [ Validators.required, Validators.minLength(5) ] ],
        email: [ '', [ Validators.required, emailValidator(DEFAULT_EMAIL_DOMAINS) ] ],
        tel: [ '' ],
        telRegion: [ '' ],
        passGroup: this.fb.group(
            {
                password: [ '', [ Validators.required, Validators.minLength(5) ] ],
                rePassword: [ '', [ Validators.required ] ]
            },
            {
                validators: [ matchPasswordsValidator('password', 'rePassword') ]
            }
        ),
    });

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) { }

    shouldDisplayErrors(controlName: string, sourceGroup: FormGroup = this.form) {
        return sourceGroup.controls[ controlName ].touched
            && sourceGroup.controls[ controlName ].invalid;
    }

    registerHandler(): void {
        if (this.form.invalid) { return; }

        const { username, email, passGroup, tel, telRegion } = this.form.value;
        const body: CreateUserDto = {       //object may be of this type also { [ key: string ]: string }
            username,
            email,
            password: passGroup.password,
            rePassword: passGroup.rePassword,
            ...(!!tel && { tel: telRegion + tel }),  //optional object property assignment
        }

        this.authService.register$(body).subscribe(() => {
            this.router.navigate([ '/home' ]);
        });
    }
}
