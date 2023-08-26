import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { NotificationMessage } from './interfaces';

@Injectable({
    providedIn: 'root'
})
export class MessageBusService {
    private _messageQueue$$ = new Subject<NotificationMessage>();

    onNewMessage$ = this._messageQueue$$.asObservable();

    constructor() { }

    notifyForMessage(message: NotificationMessage) {
        this._messageQueue$$.next(message);
    }

    clear(): void {
        this._messageQueue$$.next(undefined);
    }
}
