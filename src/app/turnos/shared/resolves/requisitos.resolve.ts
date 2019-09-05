import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { RequisitosTramiteService } from '../../wizard/confirmacion-turno/services/requisitos-tramite.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RequisitosResolve implements Resolve<Observable<Requisito[]>> {

    constructor(private requisitosTramiteService: RequisitosTramiteService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Requisito[]> {
        return this.requisitosTramiteService.getRequisitosByTramiteId(route.params['tramiteId']);
    }
}
