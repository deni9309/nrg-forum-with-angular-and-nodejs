import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap, catchError, EMPTY, BehaviorSubject } from 'rxjs';

import { IUser, CreateUserDto } from './core/interfaces';
import { environment } from '../environments/environment.development';

const { apiUrl } = environment;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _user$$ = new BehaviorSubject<IUser>(undefined);

    user$ = this._user$$.asObservable();

    isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user));

    constructor(private http: HttpClient) { }

    login$(data: { email: string, password: string }): Observable<IUser> {
        return this.http.post<IUser>(`${apiUrl}/login`, data, { withCredentials: true, observe: 'response' })
            .pipe(map(res => res.body as IUser));
    }

    register$(data: CreateUserDto): Observable<IUser> {
        return this.http.post<IUser>(`${apiUrl}/register`, data, { withCredentials: true });
    }

    logout$(): Observable<void> {
        return this.http.post<void>(`${apiUrl}/logout`, {}, { withCredentials: true });
    }

    authenticate$(): Observable<IUser> {
        return this.http.get<IUser>(`${apiUrl}/users/profile`, { withCredentials: true })
            .pipe(
                tap(currentProfile => this.handleLogin(currentProfile)),
                catchError(() => {
                    return EMPTY;
                }),
            );
    }

    handleLogin(newUser: IUser) {
       // this.store.dispatch(login({ user: newUser }));
        this._user$$.next(newUser);
    }

    handleLogout() {
        //this.store.dispatch(logout())
        this._user$$.next(undefined);
    }
}
