import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TramiteService } from './services/tramite.service';
import { WizardContextService } from '../wizard-context.service'
import 'rxjs/add/operator/map';

@Injectable()
export class TramiteResolve implements Resolve<Observable<TurnosTramite>> {

    constructor(private wizardContextService: WizardContextService,
         private tramiteService: TramiteService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<TurnosTramite> {
        return this.tramiteService.getTramiteById(route.params['tramiteId']).map((tramite: TurnosTramite) => {
            this.wizardContextService.tramite(tramite);
            return tramite;
        });
    }
}
