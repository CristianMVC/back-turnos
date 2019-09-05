import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProvinciaLocalidadService } from './services/provincia-localidad.service';

@Injectable()
export class ProvinciasResolve implements Resolve<Observable<Provincia[]>> {

    constructor(private provinciaLocalidadService: ProvinciaLocalidadService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Provincia[]> {
        return this.provinciaLocalidadService.getProvincias(route.params['tramiteId']);
    }
}
