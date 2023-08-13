import { Injectable, Provider } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { IUser } from './interfaces';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        return next.handle(request).pipe(tap(event => {

            if (event instanceof HttpResponse) {

                if (event.url.endsWith('login') || event.url.endsWith('register') || event.url.endsWith('profile')) {
                    const loggedUser: IUser = event.body as any;
                    this.authService.handleLogin(loggedUser);

                } else if (event.url.endsWith('logout')) {
                    this.authService.handleLogout();
                }
            }
        }));
    }
}

export const authInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};