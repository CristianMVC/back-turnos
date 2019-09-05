import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AreasService } from '../../areas/tabla-areas/services/areas.service';
import { OrganismosService } from '../../organismos/organismos.module';
import { OrganismoUpdateEventService } from '../../shared/shared.module';
import 'rxjs/add/observable/of';

import * as R from 'ramda';
import { Observable } from 'rxjs/Observable';
import { RolService } from 'app/shared/services/rol.service';
import { SessionService } from 'app/shared/services/session.service';

interface AreaProjection {
    id: number,
    nombre: string
}

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    organismosArea: OrganismoAreas[];
    currentAreaId = 0;

    constructor(private areaService: AreasService,
        private organismoService: OrganismosService,
        private organismoUpdateEventService: OrganismoUpdateEventService,
        private rolService: RolService,
        private sessionService: SessionService,
        private router: Router
    ) { }

    ngOnInit() {
            this.organismoService.getAllOrganismosArea()
            .subscribe((organismosArea: OrganismoAreas[]) => {
                this.organismosArea = organismosArea;
                this.subscription = this.organismoUpdateEventService.getMessage().subscribe(message => {
                    return this.loadOrganismos().subscribe((organismoArea: OrganismoAreas[]) => {
                        this.organismosArea = organismoArea;
                    });
                });
                const idOrganismo = this.sessionService.getOrganismoId();
                if (idOrganismo) {
                    this.loadAreas(idOrganismo).subscribe();
                }
            })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private loadOrganismos() {
        return this.organismoService.getAllOrganismosArea();
    }

    displayAreasAndNavigate(idOrganismo: number) {
        this.loadAreas(idOrganismo).subscribe(() => {
            this.router.navigate(['organismos', idOrganismo, 'areas'])
        })
    }

    goToAreaTab(idOrganismo: number, idArea: number) {
        if (this.currentAreaId !== idArea) {
            this.currentAreaId = idArea;
            this.router.navigate(['organismos', idOrganismo, 'areas', idArea, 'tabs'], { queryParams: { redirect: 'tramites' } })
        }
    }

    goToCrearOrganismo() {
        this.router.navigate(['organismos/agregar'])
    }

    isAdmin() {
        return this.rolService.isAdminLogged();
    }

    hasAccessToOrganismos() {
        return this.rolService.isAdminLogged();
    }

    hasAccesToArea() {
        return this.rolService.isAdminLogged() || this.rolService.isResponsableOrganismoLogged() ||
        this.rolService.isResonsableAreaLogged();
    }

    private loadAreas(idOrganismo: number): Observable<AreaProjection[]> {
        const organismoArea = R.find(R.propEq('id', idOrganismo))(this.organismosArea);
        if (R.isNil(organismoArea.areas)) {
            return this.areaService.getAllAreas(idOrganismo).map<Area[], AreaProjection[]>((areas: Area[]) => {
                const index = R.findIndex(R.propEq('id', idOrganismo))(this.organismosArea);
                return this.organismosArea[index].areas = areas.map<AreaProjection>((area: Area) => {
                    return { id: area.id, nombre: area.nombre }
                });
            });
        } else {
            return Observable.of([] as AreaProjection[])
        }
    }

}
