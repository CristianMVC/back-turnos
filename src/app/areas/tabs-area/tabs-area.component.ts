import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertContextService } from '../../shared/alert/alert-context.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import { OrganismoUpdateEventService } from '../../shared/shared.module';
import { Either } from 'monet';

@Component({
    selector: 'app-tabs-area',
    templateUrl: 'tabs-area.component.html'
})
export class AreaTabsComponent implements OnInit {

    private idArea: number;
    idOrganismo: number;
    area: Area;
    organismo: Organismo;

    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private alertContextService: AlertContextService,
        private organismoUpdateEventService: OrganismoUpdateEventService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.idArea = params['idArea'];
            this.idOrganismo = params['idOrganismo'];
            this.area = this.route.snapshot.data['area'];
            this.organismo = this.route.snapshot.data['organismo'];
            this.route.queryParams.subscribe(qParams => {
                if (qParams['redirect'] === 'tramites') {
                    return this.displayTramites();
                } else if (qParams['redirect'] === 'pda') {
                    return this.displayPuntosAtencion();
                } else {
                    return Promise.resolve();
                }
            });
        });
    }

    isTramiteTabActive() {
        if (this.route) {
            if (this.route.firstChild) {
                return this.route.firstChild.outlet === 'tramitesOutlet';
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    displayPuntosAtencion() {
        this.router.navigate([ { outlets: {
            puntosAtencionOutlet: ['puntosAtencion', this.idOrganismo, 'areas', this.idArea],
            tramitesOutlet: null } } ],
        { relativeTo: this.route });
    }

    displayTramites() {
        this.router.navigate([ { outlets: {
            tramitesOutlet: ['tramites', this.idOrganismo, 'areas', this.idArea],
            puntosAtencionOutlet: null } } ],
        { relativeTo: this.route });
    }

    goToAreas() {
        return this.router.navigate(['organismos', this.organismo.id, 'areas']);
    }

    editarArea() {
        const backUrl = ['organismos', this.organismo.id, 'areas', this.idArea, 'tabs'];
        return this.router.navigate(['organismos', this.organismo.id, 'areas', 'editar', this.idArea],
         { queryParams: { backUrl: backUrl } });
    }

    areaRemoved(status: Either<ErrorStatus, SuccessStatus>) {
        status.cata((err: ErrorStatus) => {
            this.alertComponent.errors(err.message);
        }, (suc: SuccessStatus) => {
            this.organismoUpdateEventService.emit();
            this.alertContextService.success(suc.message);
            this.router.navigate(['../../'], { relativeTo: this.route });
        });
    }

}
