import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Either } from 'monet';
import { AreasService } from './services/areas.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import { OrganismoUpdateEventService } from '../../shared/shared.module';

@Component({
    selector: 'app-tabla-areas',
    templateUrl: './tabla-areas.component.html',
    styleUrls: ['./tabla-components.scss']
})
export class TablaAreasComponent implements OnInit {
    @Input() areasPaginables: AreasPaginables;
    tramitesPaginables: Tramite[];
    idOrg: number;
    alert: Alert;
    pageSize: number;
    organismo: Organismo

    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private areasService: AreasService,
        private organismoUpdateEventService: OrganismoUpdateEventService,
    ) { }

    ngOnInit() {
        this.tramitesPaginables = this.route.snapshot.data['tramites'];

        this.route.params.subscribe(params => {
            this.idOrg =  params['idOrganismo'];
            this.organismo =  this.route.snapshot.data['organismo'];
            const offset = 0;
            this.onPageChange(offset);
        });
        this.pageSize = this.areasService.getLimit();

    }

    onPageChange(offset: number) {
        this.areasService.getAreas(this.idOrg, offset).subscribe((areas: AreasPaginables) => {
            this.areasPaginables = areas;
        });
    }

    verArea(idArea: number) {
        this.router.navigate(['organismos', this.idOrg , 'areas', idArea, 'tabs'],
            { queryParams: { redirect: 'tramites' } });
    }

    hasResults(): boolean {
        return this.areasPaginables.size > 0;
    }

    crearTramite() {
        this.router.navigate(['crear/tramite/org'], { relativeTo: this.route });
    }

    crearArea() {
        this.router.navigate(['agregar'], { relativeTo: this.route });
    }

    editarArea(area: Area) {
        this.router.navigate(['editar', area.id], { relativeTo: this.route });
    }

    editarOrganismo() {
        const backUrl = ['organismos', this.organismo.id, 'areas'];
        return this.router.navigate(['organismos', 'editar', this.idOrg],
            { queryParams: { backUrl: backUrl } });
    }

    areaRemoved(status: Either<ErrorStatus, SuccessStatus>) {
        status.cata((err: ErrorStatus) => {
            this.alertComponent.errors(err.message);
        }, (suc: SuccessStatus) => {
            this.organismoUpdateEventService.emit();
            this.onPageChange(0);
            this.alertComponent.success(suc.message);
        });
    }

    organismoRemoved(status: Either<ErrorStatus, SuccessStatus>) {
        status.cata((err: ErrorStatus) => {
            this.alertComponent.errors(err.message);
        }, (suc: SuccessStatus) => {
            this.organismoUpdateEventService.emit();
            this.alertComponent.success(suc.message);
            this.router.navigate(['organismos']);
        });
    }

}
