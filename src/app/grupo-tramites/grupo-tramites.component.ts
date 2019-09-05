import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-grupo-tramites',
    templateUrl: 'grupo-tramites.component.html'
})

export class GrupoTramitesComponent implements OnInit {

    grupoTramitesPaginables: GrupoTramites[];
    idPuntoAtencion: number;
    idOrganismo: string;
    idArea: string;

    constructor( private route: ActivatedRoute ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.idPuntoAtencion = +params['idPuntoAtencion'];
            this.idOrganismo = params['idOrganismo'];
            this.idArea = params['idArea'];
        });
        this.grupoTramitesPaginables = this.route.snapshot.data['grupos'];
    }

}
