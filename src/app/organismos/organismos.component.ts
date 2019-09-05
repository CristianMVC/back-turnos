import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-organismos',
    templateUrl: 'organismos.component.html',
    styleUrls: ['/organismos.component.scss']
})

export class OrganismosComponent implements OnInit {
    organismosPaginables: Organismo[];

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.organismosPaginables = this.route.snapshot.data['organismos'];
    }

}
