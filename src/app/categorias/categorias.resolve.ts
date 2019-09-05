import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CategoriasService } from './tabla-categorias/services/categorias.service';
import * as ResolveHelper from '../shared/resolve-helper/resolve-helper';

@Injectable()
  export class CategoriasResolve implements ResolveHelper.ResolveValue<CategoriasPaginables> {

    constructor(
        private categoriasService: CategoriasService
    ) { }

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<CategoriasPaginables> {
        const emptyCategorias: CategoriasPaginables = { size: 0, categorias: [] };
        const idPuntoAtencion = route.params['idPuntoAtencion'];
        return ResolveHelper.handleResolveData(this.categoriasService.getCategorias(idPuntoAtencion), emptyCategorias);
    }

}
