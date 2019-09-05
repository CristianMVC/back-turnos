import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface ExpirationState {
    expired: boolean;
}

@Injectable()
export class ExpirationService {

    expirationSubject = new Subject<ExpirationState>();
    private expired = false;

    constructor() { }

    setExpired(expired: boolean) {
        this.expired = expired;
        this.expirationSubject.next(<ExpirationState>{'expired': expired});
    }
}
