import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoaderService, LoaderState } from './loader.service';

@Component({
    selector: 'app-loader',
    templateUrl: 'loader.component.html',
    styleUrls: ['loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

    show = false;

    private subscription: Subscription;

    constructor(
        private loaderService: LoaderService
    ) { }

    ngOnInit() {
        this.subscription = this.loaderService.loaderSubject
        .subscribe((state: LoaderState) => {
            this.show = state.show;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
