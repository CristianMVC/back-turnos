import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TramitesService } from './tabla-tramites/services/tramites.service';
import * as ResolveHelper from '../shared/resolve-helper/resolve-helper';

@Injectable()
  export class TramitesResolve implements ResolveHelper.ResolveValue<TramitesPaginables> {

    constructor(
        private tramitesService: TramitesService
    ) { }

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<TramitesPaginables> {
        const emptyTramitePaginable: TramitesPaginables = { size: 0, tramites: [] };
        const idOrganismo = route.params['idOrganismo'];
        const idArea = route.params['idArea'];
        return ResolveHelper.handleResolveData(this.tramitesService.getTramites(idOrganismo, idArea), emptyTramitePaginable);
    }

}
