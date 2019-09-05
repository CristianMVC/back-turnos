import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { HorizonteTramiteService } from '../services/horizonte-tramite.service'

@Injectable()
export class HorizonteResolve implements Resolve<Observable<Number>> {

    constructor(private horizonteTramiteService: HorizonteTramiteService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Number> {
        return this.horizonteTramiteService.getHorizonteTramite(route.params['tramiteId']);
    }
}
