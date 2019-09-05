import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { PuntosAtencionService } from './tabla-puntos-atencion/services/puntos-atencion.service';
import * as ResolveHelper from '../shared/resolve-helper/resolve-helper';

@Injectable()
  export class PuntosAtencionResolve implements ResolveHelper.ResolveValue<PuntosAtencionPaginables> {

    constructor(
        private puntosAtencionService: PuntosAtencionService
    ) { }

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<PuntosAtencionPaginables> {
        const emptyPuntosAtencionPaginable: PuntosAtencionPaginables = { size: 0, puntosAtencion: [] };
        const idOrg = route.params['idOrganismo'];
        const idArea = route.params['idArea'];
        return ResolveHelper.handleResolveData(this.puntosAtencionService.getPuntosAtencion(idOrg, idArea), emptyPuntosAtencionPaginable);
    }

}
