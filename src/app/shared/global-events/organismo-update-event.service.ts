import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class OrganismoUpdateEventService {

    private subject = new Subject<void>();

    emit() {
        this.subject.next();
    }

    getMessage(): Subject<void> {
        return this.subject;
    }
}
