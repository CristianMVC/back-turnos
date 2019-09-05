import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CalendarioService } from './services/calendario.service';
import * as ResolveHelper from '../shared/resolve-helper/resolve-helper';

@Injectable()
export class CalendarioResolve implements ResolveHelper.ResolveValue<moment.Moment[]> {

  constructor(private calendarioService: CalendarioService) { }

  resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<moment.Moment[]> {
    const emptyDate: moment.Moment[] = [];
    return ResolveHelper.handleResolveData(this.calendarioService.getFeriados(), emptyDate);
  }
}
