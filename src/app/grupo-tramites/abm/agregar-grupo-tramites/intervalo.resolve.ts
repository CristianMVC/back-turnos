import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { IntervaloService } from './services/intervalo.service';
import * as ResolveHelper from '../../../shared/resolve-helper/resolve-helper';

@Injectable()
  export class IntervaloResolve implements ResolveHelper.ResolveValue<number[]> {

    constructor(
        private intervaloService: IntervaloService
    ) { }

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<number[]> {
        const emptyIntervalo: number[] = [];
        return ResolveHelper.handleResolveData(
            this.intervaloService.getIntervaloDisponible(route.params['idPuntoAtencion']), emptyIntervalo);
    }

}
