import { Injectable, Provider } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { MessageBusService } from './message-bus.service';
import { MessageType } from '../shared/constants/messageType';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(private messageBus: MessageBusService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(catchError(err => {
            this.messageBus.notifyForMessage({
                text: err?.error?.message || 'Something went wrong!',
                type: MessageType.Error
            });

            //notify header
            return throwError(() => err);
        }));
    }
}

export const errorHandlerInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerInterceptor,
    multi: true
};
