import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-puntos-atencion',
    templateUrl: 'puntos-atencion.component.html'
})

export class PuntosAtencionComponent implements OnInit {
    puntosAtencionPaginables: PuntoAtencion[];
    idOrganismo: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.puntosAtencionPaginables = this.route.snapshot.data['puntosAtencion'];
            this.idOrganismo = params['idOrganismo'];
        });
    }


    cancelar() {
        this.router.navigate(['organismos', this.idOrganismo, 'areas']);
    }
}
