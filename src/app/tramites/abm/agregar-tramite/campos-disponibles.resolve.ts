import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import * as ResolveHelper from '../../../shared/resolve-helper/resolve-helper';
import { AgregarTramiteService } from './services/agregar-tramite.service';

@Injectable()
export class CamposDisponiblesResolve implements ResolveHelper.ResolveValue<TramiteField[]> {

    constructor(private agregarTramiteService: AgregarTramiteService) { }

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<TramiteField[]> {
        const emptyTramiteField: TramiteField[] = [];
        return ResolveHelper.handleResolveData(this.agregarTramiteService.getCamposDisponibles(), emptyTramiteField);
    }
}
