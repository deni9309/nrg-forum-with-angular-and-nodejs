import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { IUser, IUpdateUserDto } from './interfaces';

const { apiUrl } = environment;

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private http: HttpClient) { }

    getProfile$(): Observable<IUser> {
        return this.http.get<IUser>(`${apiUrl}/users/profile`, { withCredentials: true });
    }

    // setProfile$(data: { username: string, email: string, tel?: string, profilePicture?: File }): Observable<IUser> {
    //     return this.http.put<IUser>(`${apiUrl}/users/profile`, data, { withCredentials: true, observe: 'response' }).pipe(
    //         map(res => res.body as IUser)
    //     );
    // }

    setProfile$(data: IUpdateUserDto): Observable<IUser> {
        const formData = new FormData();
        formData.set('username', data.username);
        formData.set('email', data.email);
        formData.set('tel', data.tel);

        if (data.profilePicture) {
            formData.append('profilePicture', data.profilePicture);
        }

        return this.http.put<IUser>(`${apiUrl}/users/profile`, formData, { withCredentials: true, observe: 'response' }).pipe(
            map(res => res.body as IUser) //TODO: may need to add/modify res.body type casting
        );
    }
}
