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

    loadPostById$(postId: string): Observable<IPost> {
        return this.http.get<IPost>(`${apiUrl}/posts/${postId}`);
    }

    likePost$(postId: string): Observable<void> {
        return this.http.put<void>(`${apiUrl}/likes/${postId}`, {}, { withCredentials: true });
    }

    removePostLike$(postId: string): Observable<void> {
        return this.http.put<void>(`${apiUrl}/dislikes/${postId}`, {}, { withCredentials: true });
    }

    editPost$(themeId: string, postId: string, postText: string): Observable<IPost> {
        return this.http.put<IPost>(`${apiUrl}/themes/${themeId}/posts/${postId}`, { postText }, { withCredentials: true });
    }
}
