import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertContextService } from '../../shared/alert/alert-context.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import { RolService } from '../../shared/services/rol.service';
import { Either } from 'monet';

@Component({
    selector: 'app-tabs-pda',
    templateUrl: 'tabs-puntos-atencion.component.html'
})
export class PuntoAtencionTabsComponent implements OnInit {

    puntoAtencion: PuntoAtencion;
    area: Area;
    private idPuntoAtencion: number;
    private idArea: number;
    private idOrganismo: number;

    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private alertContextService: AlertContextService,
        private rolService: RolService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.idPuntoAtencion = params['idPuntoAtencion'];
            this.idArea = params['idArea'];
            this.idOrganismo = params['idOrganismo'];
            this.puntoAtencion = this.route.snapshot.data['puntoAtencion'];
            this.area = this.route.snapshot.data['area'];

            this.route.queryParams.subscribe(qParams => {
                const redirect = qParams['redirect'];
                return redirect === 'horarios' ? this.displayRangos() : Promise.resolve();
            });
        });
    }

    isTramiteTabActive() {
        return this.isOutletActive('tramitesOutlet');
    }

    isHorariosTabActive() {
        return this.isOutletActive('rangosOutlet');
    }

    isGruposTabActive() {
        return this.isOutletActive('grupoTramitesOutlet');
    }

    isCategoriasTabActive() {
        return this.isOutletActive('categoriasOutlet');
    }

    isDiasDeshabilitadosTabActive() {
        return this.isOutletActive('diasDeshabilitadosOutlet');
    }

    displayTramites() {
        this.router.navigate([ { outlets: {
            tramitesOutlet: ['tramites', 'puntoAtencion', this.idPuntoAtencion],
            rangosOutlet: null,
            categoriasOutlet: null,
            grupoTramitesOutlet: null,
            diasDeshabilitadosOutlet: null
        } } ],
        { relativeTo: this.route });
    }

    displayGrupoTramites() {
        this.router.navigate([ { outlets: {
            grupoTramitesOutlet: ['grupoTramites', 'puntoAtencion', this.idPuntoAtencion],
            rangosOutlet: null,
            categoriasOutlet: null,
            tramitesOutlet: null,
            diasDeshabilitadosOutlet: null
        } } ],
        { relativeTo: this.route });
    }

    displayCategorias() {
        this.router.navigate([ { outlets: {
            categoriasOutlet: ['categorias', 'puntoAtencion', this.idPuntoAtencion],
            grupoTramitesOutlet: null,
            rangosOutlet: null,
            tramitesOutlet: null,
            diasDeshabilitadosOutlet: null
        } } ],
        { relativeTo: this.route });
    }

    displayRangos() {
        this.router.navigate([ { outlets: {
            rangosOutlet: ['rangos', 'puntoAtencion', this.idPuntoAtencion],
            categoriasOutlet: null,
            grupoTramitesOutlet: null,
            tramitesOutlet: null,
            diasDeshabilitadosOutlet: null
        } } ],
        { relativeTo: this.route });
    }

    displayDiasDeshabilitados() {
        this.router.navigate([ { outlets: {
            diasDeshabilitadosOutlet: ['diasDeshabilitados', 'puntoAtencion', this.idPuntoAtencion],
            categoriasOutlet: null,
            rangosOutlet: null,
            grupoTramitesOutlet: null,
            tramitesOutlet: null
        } } ],
        { relativeTo: this.route });
    }

    goToArea() {
        return this.router.navigate(
            ['organismos', this.idOrganismo, 'areas', this.idArea, 'tabs'],
            { queryParams: { redirect: 'pda' } });
    }

    hideBackButton(): boolean {
        return this.rolService.isResponsablePdaLogged();
    }

    editarPuntoAtencion() {
        const backUrl = ['organismos', this.idOrganismo, 'areas', this.idArea, 'puntosAtencion', this.idPuntoAtencion, 'tabs'];
        return this.router.navigate(['organismos', this.idOrganismo, 'areas', this.idArea, 'tabs', {
            outlets: {
                puntosAtencionOutlet: ['puntosAtencion', this.idOrganismo, 'areas', this.idArea, 'editar', this.idPuntoAtencion],
                tramitesOutlet: []
            }
        }], { queryParams: { backUrl: backUrl } })
    }

    puntoAtencionRemoved(status: Either<ErrorStatus, SuccessStatus>) {
        status.cata(err => this.alertComponent.errors(err.message),
                    suc => {
                        this.alertContextService.success(suc.message);
                        this.router.navigate(['../../'], { relativeTo: this.route });
                    })
    }

    private isOutletActive(name: string) {
        if (this.route) {
            if (this.route.firstChild) {
                return this.route.firstChild.outlet === name;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}
