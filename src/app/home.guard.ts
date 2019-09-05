import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionService } from './shared/services/session.service';
import { RolService } from './shared/services/rol.service';
import { environment } from '../environments/environment';

@Injectable()
export class HomeGuard implements CanActivate {

  constructor(
      private sessionServices: SessionService,
      private rolService: RolService
  ) { }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): boolean {
    const destino = route.queryParams['destino'];
    const data = route.queryParams['data'];

    if (destino && data) {
        if (this.rolService.canNavigate(destino)) {
            this.sessionServices.saveData(data);
            if (this.sessionServices.isUserInSession() && this.rolService.canNavigateRol(destino)) {
                this.sessionServices.emit();
                return true;
            } else {
                window.location.href = environment.endpoint.Usuarios;
                return false;
            }
        } else {
            window.location.href = environment.endpoint.Usuarios;
            return false;
        }
    } else {
         if (this.sessionServices.isUserInSession()) {
             this.sessionServices.emit();
             return true;
         } else {
             window.location.href = environment.endpoint.Usuarios;
             return false;
         }
    }
    }
}
