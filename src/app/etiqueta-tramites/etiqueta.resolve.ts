import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { EtiquetasService } from './services/etiqueta.service';
import * as ResolveHelper from '../shared/resolve-helper/resolve-helper';

@Injectable()
export class EtiquetaResolve implements ResolveHelper.ResolveValue<EtiquetasPag> {

    constructor(
        private etiquetasService: EtiquetasService
    ) { }

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<EtiquetasPag> {
        const emptyEtiquetas: EtiquetasPag = { size: 0, etiquetas: [] };
        return ResolveHelper.handleResolveData(this.etiquetasService.getEtiquetas(), emptyEtiquetas);
    }

}