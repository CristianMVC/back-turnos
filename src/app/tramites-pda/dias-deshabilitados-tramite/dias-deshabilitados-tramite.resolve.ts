import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { DiasDeshabilitadosTramiteService } from './services/dias-deshabilitados-tramite.service';
import * as ResolveHelper from '../../shared/resolve-helper/resolve-helper';

@Injectable()
export class DiasDeshabilitadosResolve implements ResolveHelper.ResolveValue<moment.Moment[]> {

  constructor(private diasDeshabilitadosService: DiasDeshabilitadosTramiteService) { }

  resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<moment.Moment[]> {
    const emptyDate: moment.Moment[] = [];
    const idPuntoAtencion = route.params['idPuntoAtencion'];
    const tramite_id = route.params['idTramite'];
    
    return ResolveHelper.handleResolveData(this.diasDeshabilitadosService.getDiasDeshabilitados(idPuntoAtencion,tramite_id), emptyDate);
  }

}
