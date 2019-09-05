import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


export interface LoaderState {
    show: boolean;
}

@Injectable()
export class LoaderService {

    loaderSubject = new Subject<LoaderState>();
    private pendingRequests = 0;

    constructor() { }
    show() {
        this.pendingRequests++;
        this.loaderSubject.next(<LoaderState>{show: true});
    }

    hide() {
        this.pendingRequests--;
        if (this.pendingRequests === 0) {
            this.loaderSubject.next(<LoaderState>{show: false});
        }
    }
}
