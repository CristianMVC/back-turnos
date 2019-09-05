import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TramitesService } from './services/tramites.service';
import { AlertComponent } from '../../shared/alert/alert.component';

@Component({
    selector: 'app-tabla-tramites-pda',
    templateUrl: './tabla-tramites.component.html'
})
export class TablaTramitesComponent implements OnInit {
    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    @Input() tramitesPaginables: TramitesPdaPaginables;

    idPuntoAtencion: number;
    pageSize: number;

    constructor(
        private route: ActivatedRoute,
        private tramitesService: TramitesService,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.idPuntoAtencion = +params['idPuntoAtencion'];
        });
        this.pageSize = this.tramitesService.getLimit();
    }

    onPageChange(offset: number) {
        this.tramitesService.getTramites(this.idPuntoAtencion, offset)
            .subscribe((tramites: TramitesPdaPaginables) => {
                this.tramitesPaginables = tramites;
            });
    }

    hasResults(): boolean {
        return this.tramitesPaginables.size > 0;
    }

    onEstadoChange(value: number, idTramite: number) {
        this.tramitesService.setEstadoTramite(this.idPuntoAtencion, idTramite, value)
            .subscribe((response: BackOfficeStatusResponse) => {
            }, (err: ErrorSNT) => {
                this.alertComponent.errors(err);
            });
    }
    
    sacarTurno(tramiteSeleccionado: Tramite) {
        sessionStorage.setItem("tramites_back",this.router.url);
        this.router.navigate(
          ['/turnos/seleccionTurno', tramiteSeleccionado.id ]
        )
      }

    editar(tramiteSeleccionado: Tramite) {
        this.router.navigate(['editar', tramiteSeleccionado.id], { relativeTo: this.route });
    }
    deshabilitar(tramiteSeleccionado: Tramite) {
        this.router.navigate(['deshabilitar', tramiteSeleccionado.id], { relativeTo: this.route });
    }

}
