import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RolService } from '../shared/services/rol.service';

@Injectable()
export class AreaGuard implements CanActivate {

    constructor(
        private rolService: RolService
    ) { }

    canActivate(): boolean {
        return this.rolService.isAdminLogged() || this.rolService.isResponsableOrganismoLogged() || this.rolService.isOrganismoAuxLogged();
    }
}
