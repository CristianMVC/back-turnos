import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AgregarPuntoAtencionService } from './services/agregar-punto-atencion.service';
import * as ResolveHelper from '../../../shared/resolve-helper/resolve-helper';

@Injectable()
export class PuntoAtencionResolve implements ResolveHelper.ResolveValue<PuntoAtencion> {

    constructor(private agregarPuntoAtencionService: AgregarPuntoAtencionService) { }

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<PuntoAtencion> {
        const emptyPuntoAtencion: PuntoAtencion = {
             area: { abreviatura: '', id: 0, nombre: '' },
             direccion: '', id: 0,
             localidad: { id: 0, nombre: '' },
             nombre: '',
             provincia: { id: 0, nombre: '' },
             tramites: [],
             estado: 1
        };
        return ResolveHelper.handleResolveData
        (this.agregarPuntoAtencionService.getPuntoAtencionById(route.params['idPuntoAtencion']), emptyPuntoAtencion);
    }
}
