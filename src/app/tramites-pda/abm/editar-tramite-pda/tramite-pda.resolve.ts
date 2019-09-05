import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { EditarTramitePdaService } from './services/editar-tramite-pda.service';
import * as ResolveHelper from '../../../shared/resolve-helper/resolve-helper';

@Injectable()
  export class TramitePdaResolve implements ResolveHelper.ResolveValue<TramitePda> {

    constructor(
        private editarTramitePdaService: EditarTramitePdaService
    ) { } 

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<TramitePda> {
        const emptyTramitePda: TramitePdaForm = { id: 0, nombre: '' };
        return ResolveHelper.handleResolveData( 
            this.editarTramitePdaService.getTramitePdaById(
                route.params['idPuntoAtencion'], route.params['idTramite']), emptyTramitePda);
    }
}
