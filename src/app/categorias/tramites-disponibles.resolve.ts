import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AgregarCategoriaService } from './abm/abm-categorias.module';
import * as ResolveHelper from '../shared/resolve-helper/resolve-helper';

@Injectable()
  export class TramitesDisponiblesResolve implements ResolveHelper.ResolveValue<Tramite[]> {

    constructor(
        private agregarCategoriaService: AgregarCategoriaService
    ) { }

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<Tramite[]> {
        const emptyTramites: Tramite[] = [];
        const idPuntoAtencion = route.params['idPuntoAtencion'];
        return ResolveHelper.handleResolveData(this.agregarCategoriaService.getTramitesDisponibles(idPuntoAtencion), emptyTramites);
    }

}
