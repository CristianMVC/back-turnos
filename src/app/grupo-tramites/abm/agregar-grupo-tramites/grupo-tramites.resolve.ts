import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AgregarGrupoTramitesService } from './services/agregar-grupo-tramites.service';
import * as ResolveHelper from '../../../shared/resolve-helper/resolve-helper';

@Injectable()
  export class GrupoTramitesResolve implements ResolveHelper.ResolveValue<GrupoTramites> {

    constructor(
        private agregarGrupoTramitesService: AgregarGrupoTramitesService
    ) { }

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<GrupoTramites> {
        const emptyGrupoTramite: GrupoTramites = { id: 0, cantidadTramites: 0, horizonte: 0, intervalo: 0, nombre: '', tramites: [] };
        return ResolveHelper.handleResolveData(
            this.agregarGrupoTramitesService.getGrupoTramitesById(
                route.params['idPuntoAtencion'], route.params['idGrupoTramites']), emptyGrupoTramite);
    }
}
