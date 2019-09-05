import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AreasService } from './tabla-areas/services/areas.service';
import * as ResolveHelper from '../shared/resolve-helper/resolve-helper';

@Injectable()
  export class AreasResolve implements ResolveHelper.ResolveValue<AreasPaginables> {

    constructor(
        private areasService: AreasService
    ) { }

    resolve(route: ActivatedRouteSnapshot):
     ResolveHelper.ResolveValueStream<AreasPaginables> {
        const emptyAreas: AreasPaginables = { areas: [], size: 0 };
        const idOrg = route.params['idOrganismo'];
        return ResolveHelper.handleResolveData(this.areasService.getAreas(idOrg), emptyAreas);
    }

}
