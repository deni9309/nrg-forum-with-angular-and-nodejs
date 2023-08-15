import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPost, ITheme } from './interfaces';
import { environment } from '../../environments/environment.development';

const { apiUrl } = environment;

@Injectable()
export class ThemeService {

    constructor(private http: HttpClient) { }

    loadThemeList(searchTerm: string = ''): Observable<ITheme[]> {
        return this.http.get<ITheme[]>(`${apiUrl}/themes?title=${searchTerm}`);
    }

    loadThemeById(id: string): Observable<ITheme<IPost>> {
        return this.http.get<ITheme<IPost>>(`${apiUrl}/themes/${id}`);
    }

    createTheme$(data: { themeName: string, postText: string }): Observable<ITheme> {
        return this.http.post<ITheme>(`${apiUrl}/themes`, data, { withCredentials: true });
    }

    createThemePost$(themeId: string, postText: string): Observable<ITheme<IPost>> {
        return this.http.post<ITheme<IPost>>(`${apiUrl}/themes/${themeId}`, { postText }, { withCredentials: true });
    }

    subscribeToTheme$(themeId: string): Observable<ITheme<IPost>> {
        return this.http.put<ITheme<IPost>>(
            `${apiUrl}/themes/${themeId}`,
            {},
            { withCredentials: true }
        );
    }

    unsubscribeFromTheme$(themeId: string): Observable<ITheme<IPost>> {
        return this.http.put<ITheme<IPost>>(
            `${apiUrl}/themes/unsubscribe/${themeId}`,
            {},
            { withCredentials: true }
        );
    }
}
