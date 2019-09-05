import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CategoriasService } from './services/categoria.service';
import * as ResolveHelper from '../shared/resolve-helper/resolve-helper';

@Injectable()
export class CategoriaResolve implements ResolveHelper.ResolveValue<CategoriasPaginables> {

    constructor(
        private categoriasService: CategoriasService
    ) { }

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<CategoriasPaginables> {
        const emptyCategorias: CategoriasPaginables = { size: 0, categorias: [] };
        return ResolveHelper.handleResolveData(this.categoriasService.getCategorias(), emptyCategorias);
    }

}