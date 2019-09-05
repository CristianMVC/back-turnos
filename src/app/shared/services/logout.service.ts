import { HttpSNT } from './http-snt';
import { Injectable } from '@angular/core';

@Injectable()
export class LogoutService {

    constructor(private httpSNT: HttpSNT) { }

    cleanSession() {
        return this.httpSNT.post('auth/logout', {}, 'usuarios')
            .map((response) => {
                return response;
            })

    }
}
