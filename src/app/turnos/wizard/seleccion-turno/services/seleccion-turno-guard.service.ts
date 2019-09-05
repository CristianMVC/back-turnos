import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { WizardContextService } from '../../../wizard/wizard-context.service';

@Injectable()
export class SeleccionTurnoGuard implements CanActivate {

    constructor(private wizardContextService: WizardContextService,
    private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.wizardContextService.hasTramite()) {
            return true;
        } else {
            this.router.navigate(['/turnos'])
            return false;
        }
    }
}
