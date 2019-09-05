import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { GrupoTramitesService } from './tabla-grupo-tramites/services/grupo-tramites.service';
import * as ResolveHelper from '../shared/resolve-helper/resolve-helper';

@Injectable()
  export class GruposTramitesResolve implements ResolveHelper.ResolveValue<GrupoTramitesPaginables> {

    constructor(
        private grupoTramitesService: GrupoTramitesService
    ) { }

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<GrupoTramitesPaginables> {
        const emptyGrupoTramitePaginable: GrupoTramitesPaginables = { grupos: [], size: 0 };
        const idPuntoAtencion = route.params['idPuntoAtencion'];
        return ResolveHelper.handleResolveData(this.grupoTramitesService.getGrupoTramites(idPuntoAtencion), emptyGrupoTramitePaginable);
    }

}
