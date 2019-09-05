import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Either } from 'monet';
import { GrupoTramitesService } from '../tabla-grupo-tramites/services/grupo-tramites.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import { AgregarGrupoTramitesService } from '../abm/abm-grupo-tramites.module';

@Component({
    selector: 'app-tabla-grupo-tramites',
    templateUrl: './tabla-grupo-tramites.component.html'
})
export class TablaGrupoTramitesComponent implements OnInit {
    @Input() grupoTramitesPaginables: GrupoTramitesPaginables;

    idPuntoAtencion: number;
    pageSize: number;
    tramitesDisponibles: Tramite[];

    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private grupoTramitesService: GrupoTramitesService,
        private agregarGrupoTramitesService: AgregarGrupoTramitesService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.idPuntoAtencion = +params['idPuntoAtencion'];
        });
        this.pageSize = this.grupoTramitesService.getLimit();

        this.tramitesDisponibles = this.route.snapshot.data['tramitesDisponibles'];
    }

    getTramitesDisponibles() {
        return this.tramitesDisponibles;
    }

    onPageChange(offset: number) {
        this.grupoTramitesService.getGrupoTramites(this.idPuntoAtencion, offset)
            .subscribe((grupoTramites: GrupoTramitesPaginables) => {
                this.grupoTramitesPaginables = grupoTramites;
            });
    }

    hasResults(): boolean {
        return this.grupoTramitesPaginables.size > 0;
    }

    crearGrupoTramites() {
        this.router.navigate(['agregar'], { relativeTo: this.route });
    }

    editar(grupo: GrupoTramites) {
        this.router.navigate(['editar', grupo.id], { relativeTo: this.route });
    }

    grupoTramitesRemoved(status: Either<ErrorStatus, SuccessStatus>) {
        status.cata((err) => {
            this.alertComponent.errors(err.message);
        }, (suc) => {
            this.onPageChange(0);
            this.alertComponent.success(suc.message);
        });

        this.updateTramitesDisponibles();
    }

    private updateTramitesDisponibles() {
        this.agregarGrupoTramitesService.getTramitesDisponibles(this.idPuntoAtencion)
            .subscribe((tramites: Tramite[]) => {
                this.tramitesDisponibles = tramites;
            });
    }

    hayTramitesDisponibles() {
        return this.tramitesDisponibles && this.tramitesDisponibles.length > 0;
    }

}
