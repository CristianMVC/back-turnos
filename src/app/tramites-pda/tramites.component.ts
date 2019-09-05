import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-tramites-pda',
    templateUrl: 'tramites.component.html'
})

export class TramitesComponent implements OnInit {

    tramites: TramitePda[];
    idPuntoAtencion: number;
    idOrganismo: string;
    idArea: string;

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.idPuntoAtencion = +params['idPuntoAtencion'];
            this.idOrganismo = params['idOrganismo'];
            this.idArea = params['idArea'];
        });
        this.tramites = this.route.snapshot.data['tramites'];
    }
}
