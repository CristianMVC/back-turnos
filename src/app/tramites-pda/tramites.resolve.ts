import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TramitesService } from './tabla-tramites/services/tramites.service';
import * as ResolveHelper from '../shared/resolve-helper/resolve-helper';

@Injectable()
  export class TramitesPdaResolve implements ResolveHelper.ResolveValue<TramitesPdaPaginables> {

    constructor(
        private tramitesService: TramitesService
    ) { }

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<TramitesPdaPaginables> {
        const emptyTramitesPdaPaginables: TramitesPdaPaginables = { size: 0, tramites: [] };
        const idPuntoAtencion = route.params['idPuntoAtencion'];
        return ResolveHelper.handleResolveData(this.tramitesService.getTramites(idPuntoAtencion), emptyTramitesPdaPaginables);
    }

}
