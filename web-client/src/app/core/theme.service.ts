import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPost, ITheme, PaginatedResponse } from './interfaces';
import { environment } from '../../environments/environment.development';

const { apiUrl } = environment;

@Injectable()
export class ThemeService {

    constructor(private http: HttpClient) { }

    loadThemeList(searchTerm: string = ''): Observable<ITheme[]> {
        let encodedSearch = searchTerm;
        if (searchTerm !== '') {
            encodedSearch = encodeURIComponent(searchTerm)
        }
        return this.http.get<ITheme[]>(`${apiUrl}/themes?title=${encodedSearch}`);
    }

    loadThemePaginatedList(searchTerm: string = '', startIndex: number = 0, limit: number): Observable<PaginatedResponse<ITheme>> {
        let encodedSearch = searchTerm;
        if (searchTerm !== '') {
            encodedSearch = encodeURIComponent(searchTerm);
        }

        return this.http.get<PaginatedResponse<ITheme>>(`${apiUrl}/themes/pages`, {
            params: new HttpParams({
                fromObject: {
                    title: encodedSearch,
                    startIndex,
                    limit
                }
            })
        });
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
