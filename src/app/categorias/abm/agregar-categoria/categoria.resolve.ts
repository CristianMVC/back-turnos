import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AgregarCategoriaService } from './services/agregar-categoria.service';
import * as ResolveHelper from '../../../shared/resolve-helper/resolve-helper';

@Injectable()
  export class CategoriaResolve implements ResolveHelper.ResolveValue<Categoria> {

    constructor(
        private agregarCategoriaService: AgregarCategoriaService
    ) { }

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<Categoria> {
        const emptyCategoria: Categoria = { id: 0, cantidadTramites: 0, nombre: '', tramites: [] };
        return ResolveHelper.handleResolveData(
            this.agregarCategoriaService.getCategoriaById(
                route.params['idPuntoAtencion'], route.params['idCategoria']), emptyCategoria);
    }
}
