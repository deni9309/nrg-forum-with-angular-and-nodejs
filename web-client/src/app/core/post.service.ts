import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IPost } from './interfaces';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient) { }

    loadPostList(themeId: string, limit?: number): Observable<IPost[]> {
        return this.http.get<IPost[]>(
            `${apiUrl}/posts${limit ? `?limit=${limit}` : ''}`
        );
    }

    likePost(postId: string): Observable<void> {
        return this.http.put<void>(`/likes/${postId}`, {});
    }

    removePostLike(postId: string): Observable<void> {
        return this.http.put<void>(`/dislikes/${postId}`, {});
    }
}
