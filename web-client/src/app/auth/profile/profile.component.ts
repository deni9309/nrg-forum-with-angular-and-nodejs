import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { DEFAULT_EMAIL_DOMAINS } from '../../shared/constants/validation-constants';
import { IUser } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: [ './profile.component.scss' ],
    animations: [
        trigger('fade', [
            state('void', style({ opacity: 0 })),
            transition('void => *', [
                animate(1000)
            ])
        ]),
        trigger('slide', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateX(-20%)' }),
                animate('500ms 300ms ease-out', style({ opacity: 1, transform: 'translateX(0%)' }))
            ]),
            transition(':leave', [
                animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(-20%)' }))
            ])
        ])
    ]
})
export class ProfileComponent implements OnInit {
    @ViewChild('form') form: NgForm;

    validDomains: string[] = DEFAULT_EMAIL_DOMAINS;
    isEditMode: boolean = false;

    profileDetails: IUser;
    newProfilePicture?: File;

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.userService.getProfile$().subscribe({
            next: user => {
                this.profileDetails = user
            },
            error: () => {
                this.router.navigate([ '/error' ]);
            }
        });
    }

    toggleEditMode() { this.isEditMode = !this.isEditMode; }

    enterEditMode(): void {
        this.isEditMode = true;
        setTimeout(() => { this.populateForm(this.profileDetails) });
    }

    ProfilePictureChangeHandler(event: Event | InputEvent) {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        this.newProfilePicture = input.files[ 0 ];
    }

    saveProfileHandler(form: NgForm) {
        if (form.invalid) { return; }
        let { username, email, tel } = form.value;
        if (!tel) { tel = '' }
        let profilePicture = this.newProfilePicture;

        this.userService.setProfile$({ username, email, tel, profilePicture }).subscribe({
            next: (user) => {
                this.profileDetails = user;
            },
            error: () => this.router.navigate([ '/error' ]),
            complete: () => {
                this.isEditMode = false;
            }
        });
    }

    populateForm(data: IUser) {
        this.form.form.patchValue({
            username: data.username,
            email: data.email,
            tel: data.tel ? data.tel : '',
        });
    }
}
