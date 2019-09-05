import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AgregarOrganismoService } from './services/agregar-organismo.service';
import * as ResolveHelper from '../../../shared/resolve-helper/resolve-helper';

@Injectable()
export class OrganismoResolve implements ResolveHelper.ResolveValue<Organismo> {

    constructor(private agregarOrganismoService: AgregarOrganismoService) { }

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<Organismo> {
        const emptyOrganismo: Organismo = { id: 0, abreviatura: '', nombre: '' };
        return ResolveHelper.handleResolveData(this.agregarOrganismoService.getOrganismoById(route.params['idOrganismo']), emptyOrganismo);
    }
}
