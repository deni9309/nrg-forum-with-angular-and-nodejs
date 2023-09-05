import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '../../../core/interfaces';
import { PostService } from '../../../core/post.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: [ './post-list.component.scss' ],
    animations: [
        trigger('slide', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateX(10%)' }),
                animate('700ms 800ms ease-out', style({ opacity: 1, transform: 'none' }))
            ]),
            transition(':leave', [
                animate('700ms ease', style({ opacity: 0, transform: 'translateX(10%)' }))
            ])
        ])
    ]
})
export class PostListComponent implements OnInit {

    @Input() themeId!: string;

    postList: IPost[];

    constructor(private postService: PostService) { }

    ngOnInit(): void {
        this.postService.loadPostList(this.themeId, 5).subscribe(postList => {
            this.postList = postList;
        });
    }

    postListTrackBy(index: number, post: IPost) {
        return post._id;
    }
}
