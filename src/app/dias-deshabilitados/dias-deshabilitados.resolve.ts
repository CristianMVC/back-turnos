import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { DiasDeshabilitadosService } from './services/dias-deshabilitados.service';
import * as ResolveHelper from '../shared/resolve-helper/resolve-helper';

@Injectable()
export class DiasDeshabilitadosResolve implements ResolveHelper.ResolveValue<moment.Moment[]> {

  constructor(private diasDeshabilitadosService: DiasDeshabilitadosService) { }

  resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<moment.Moment[]> {
    const emptyDate: moment.Moment[] = [];
    const idPuntoAtencion = route.params['idPuntoAtencion'];
    return ResolveHelper.handleResolveData(this.diasDeshabilitadosService.getDiasDeshabilitados(idPuntoAtencion), emptyDate);
  }

}
