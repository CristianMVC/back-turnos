import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AgregarAreaService } from './services/agregar-area.service';
import * as ResolveHelper from '../../../shared/resolve-helper/resolve-helper';

@Injectable()
export class AreaResolve implements ResolveHelper.ResolveValue<Area> {

    constructor(private agregarAreaService: AgregarAreaService) { }

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<Area> {
        const emptyArea: Area = {id: 0, nombre: '', abreviatura: ''};
        return ResolveHelper.handleResolveData
        (this.agregarAreaService.getAreaById
            (route.params['idOrganismo'], route.params['idArea']), emptyArea);
    }
}
