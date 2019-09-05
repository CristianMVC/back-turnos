import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RolService } from '../shared/services/rol.service';

@Injectable()
export class CalendarioGuard implements CanActivate {

    constructor(
        private rolService: RolService
    ) { }

    canActivate(): boolean {
        const rol = this.rolService.getRol();
        return (rol !== null && this.rolService.isAdmin(rol));
    }
}
