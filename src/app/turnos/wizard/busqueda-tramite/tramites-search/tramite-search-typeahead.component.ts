import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AlertContextService } from '../../../shared/alert/alert-context.service';

import { Subject } from 'rxjs/Subject';
import { TramitesService } from '../services/tramites.service';

@Component({
    selector: 'app-tramites-search',
    templateUrl: 'tramite-search-typeahead.component.html',
    styleUrls: ['tramite-search-typeahead.component.scss']
})

export class TramiteSearchTypeaheadComponent implements OnInit {
    keywords$ = new Subject<string>();
    searchText = '';
    hidden: boolean;
    alert: Alert | undefined;

    @Output() newTramiteFilterValue: EventEmitter<string[]> = new EventEmitter<string[]>();

    constructor(private tramiteService: TramitesService,
        private alertContextService: AlertContextService) {
        this.tramiteService
            .getTramitesByKeywords(this.keywords$.map((keyword: string) => {
                return this.splitSearchText(keyword);
            }))
            .subscribe(() => {
                this.newTramiteFilterValue.emit(this.splitSearchText(this.searchText).filter((keyword: string) => keyword !== ''));
            });
    }

    ngOnInit() {
        this.alert = this.alertContextService.getAlert();
    }

    onSubmit() {
        this.newTramiteFilterValue.emit(this.splitSearchText(this.searchText));
    }


    private splitSearchText(text: string) {
        return text.split(' ');
    }
}
