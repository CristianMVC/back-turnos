import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-rangos',
    templateUrl: 'rangos.component.html'
})

export class RangosComponent implements OnInit {

    rangosPaginables: Rango[];
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
        this.rangosPaginables = this.route.snapshot.data['rangos'];
    }
}
