import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PuntosAtencionService } from './services/puntos-atencion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from '../../shared/alert/alert.component';
import { Either } from 'monet';

@Component({
    selector: 'app-tabla-puntos-atencion',
    templateUrl: './tabla-puntos-atencion.component.html'
})
export class TablaPuntosAtencionComponent implements OnInit {

    @Input() puntosAtencionPaginables: PuntosAtencionPaginables;
    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    idOrg: number;
    idArea: number;
    alert: Alert;
    pageSize: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private puntosAtencionService: PuntosAtencionService
    ) { }

    ngOnInit() {
        this.idOrg = this.route.snapshot.params['idOrganismo'];
        this.idArea = this.route.snapshot.params['idArea'];

        this.pageSize = this.puntosAtencionService.getLimit();
    }

    onPageChange(offset: number) {
        this.puntosAtencionService.getPuntosAtencion(this.idOrg, this.idArea, offset)
        .subscribe((puntosAtencion: PuntosAtencionPaginables) => {
            this.puntosAtencionPaginables = puntosAtencion;
        });
    }

    hasResults(): boolean {
        return this.puntosAtencionPaginables.size > 0;
    }

    verPuntoAtencion(idPuntoAtencion: number) {
        this.router.navigate(
            ['organismos', this.idOrg, 'areas', this.idArea, 'puntosAtencion', idPuntoAtencion, 'tabs' ],
            { queryParams: { redirect: 'horarios' } }
        );
    }

    crearPuntoAtencion() {
        this.router.navigate(
            ['agregar'],
            { relativeTo: this.route });
    }

    editarPuntoAtencion(puntoAtencion: PuntoAtencion) {
        this.router.navigate(
            ['editar', puntoAtencion.id],
            { relativeTo: this.route });
    }

    puntoRemoved(status: Either<ErrorStatus, SuccessStatus>) {
        status.cata(err => this.alertComponent.errors(err.message),
                    suc => {
                        this.onPageChange(0);
                        this.alertComponent.success(suc.message);
                    })
    }

}
