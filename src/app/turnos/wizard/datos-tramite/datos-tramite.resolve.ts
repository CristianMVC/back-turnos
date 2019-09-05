import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormularioTramiteService } from './services/formulario-tramite.service'

@Injectable()
export class DatosTramiteResolve implements Resolve<Observable<Formulario>> {

    constructor(private formularioTramiteService: FormularioTramiteService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Formulario> {
        return this.formularioTramiteService.getFormularioByTramiteId(route.params['tramiteId']);
    }
}
