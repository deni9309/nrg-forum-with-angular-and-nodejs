import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest, mergeMap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IPost, IUser } from 'src/app/core/interfaces';
import { MessageBusService } from 'src/app/core/message-bus.service';
import { PostService } from 'src/app/core/post.service';
import { MessageType } from 'src/app/shared/constants/messageType';

@Component({
    selector: 'app-post-edit',
    templateUrl: './post-edit.component.html',
    styleUrls: [ './post-edit.component.scss' ],
    animations: [
        trigger('fade', [
            state('void', style({ opacity: 0 })),
            transition('void => *', [
                animate(1000)
            ])
        ]),

        trigger('slide', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateX(10%)' }),
                animate('700ms 900ms ease-out', style({ opacity: 1, transform: 'none' }))
            ]),
            transition(':leave', [
                animate('600ms ease', style({ opacity: 0, transform: 'translateX(10%)' }))
            ])
        ])
    ]
})
export class PostEditComponent implements OnInit {
    @ViewChild('form') form: NgForm;

    errorMessage: string = '';
    post: IPost;
    currentUser?: IUser;
    isOwner: boolean = false;

    isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
    currentUser$: Observable<IUser> = this.authService.user$;

    constructor(
        private authService: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private postService: PostService,
        private messageBus: MessageBusService,
    ) { }

    ngOnInit(): void {
        combineLatest([
            this.activatedRoute.params.pipe(
                mergeMap(params => {
                    const postId = params[ 'postId' ];
                    return this.postService.loadPostById$(postId)
                })
            ),
            this.currentUser$
        ])
            .subscribe({
                next: ([ post, user ]) => {
                    this.post = post;
                    this.currentUser = user;
                    this.isOwner = user && this.post.userId._id === user._id;

                    setTimeout(() => { this.populateForm(post) });
                },
                error: (err) => {
                    console.error(err);
                    this.router.navigate([ '/error' ]);
                }
            });
    }

    submitPostHandler(form: NgForm) {
        if (form.invalid) return;

        const { postText } = form.value;
        this.postService.editPost$(this.post.themeId._id.toString(), this.post._id, postText).subscribe({
            next: (post) => {
                form.reset();
                this.router.navigate([ `/themes/${post.themeId._id.toString()}` ]);
                this.messageBus.notifyForMessage({ text: 'Post updated successfully!', type: MessageType.Success });
            },
            error: (err) => {
                this.router.navigate([ '/error' ]);
                this.messageBus.notifyForMessage({ text: err.error.message, type: MessageType.Error });
            }
        });
    }

    navigateToPostThemeHandler(): void {
        this.router.navigate([ `/themes/${this.post.themeId._id}` ]);
    }

    populateForm(data: IPost) {
        console.log(data);

        this.form.form.patchValue({
            postText: data.text
        });
    }
}
