import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AgregarGrupoTramitesService } from './abm/agregar-grupo-tramites/services/agregar-grupo-tramites.service';
import * as ResolveHelper from '../shared/resolve-helper/resolve-helper';

@Injectable()
  export class TramitesDisponiblesResolve implements ResolveHelper.ResolveValue<Tramite[]> {

    constructor(
        private agregarGrupoTramitesService: AgregarGrupoTramitesService
    ) { }

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<Tramite[]> {
        const emptyTramites: Tramite[] = [];
        const idPuntoAtencion = route.params['idPuntoAtencion'];
        return ResolveHelper.handleResolveData(this.agregarGrupoTramitesService.getTramitesDisponibles(idPuntoAtencion), emptyTramites);
    }

}
