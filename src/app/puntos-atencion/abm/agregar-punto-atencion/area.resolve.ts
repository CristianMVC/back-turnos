import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AgregarPuntoAtencionService } from './services/agregar-punto-atencion.service';
import * as ResolveHelper from '../../../shared/resolve-helper/resolve-helper';

@Injectable()
export class AreaResolve implements ResolveHelper.ResolveValue<Area> {

    constructor(
        private agregarPuntoAtencionService: AgregarPuntoAtencionService
    ) { }

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<Area> {
        const emptyArea: Area = { abreviatura: '', id: 0, nombre: '' };
        return ResolveHelper.handleResolveData(
            this.agregarPuntoAtencionService.getAreaById(
                route.params['idOrganismo'], route.params['idArea']), emptyArea);
    }
}
