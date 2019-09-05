import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AgregarTramiteService } from './services/agregar-tramite.service';

@Injectable()
  export class TramiteResolve implements Resolve<Observable<NuevoTramiteForm>> {

    constructor(private agregarTramiteService: AgregarTramiteService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<NuevoTramiteForm> {
        return this.agregarTramiteService.getTramiteById(route.params['idTramite']);
    }
}
