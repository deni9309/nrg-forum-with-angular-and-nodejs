import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '../../../core/interfaces';
import { PostService } from '../../../core/post.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: [ './post-list.component.scss' ]
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
