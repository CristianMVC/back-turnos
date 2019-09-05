import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TramitesService } from '../services/tramites.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TramitesResolve implements Resolve<Observable<TurnosTramitesPaginables>> {

    constructor(private tramiteService: TramitesService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<TurnosTramitesPaginables> {
        const keywords: string[] = [];
        return this.tramiteService.getTramites(keywords);
    }
}
