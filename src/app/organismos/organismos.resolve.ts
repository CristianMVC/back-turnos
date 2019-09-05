import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { OrganismosService } from './tabla-organismos/services/organismos.service';
import * as ResolveHelper from '../shared/resolve-helper/resolve-helper';

@Injectable()
  export class OrganismosResolve implements ResolveHelper.ResolveValue<OrganismosPaginables> {

    constructor(
        private organismosService: OrganismosService
    ) { }

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<OrganismosPaginables> {
        const emptyOrganismoPaginable: OrganismosPaginables = { organismos: [], size: 0 };
        return ResolveHelper.handleResolveData(this.organismosService.getOrganismos(), emptyOrganismoPaginable);
    }

}
