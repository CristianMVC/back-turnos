import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { AgregarOrganismoService, EliminarOrganismoService } from '../../../../organismos/abm/abm-organismo.module';
import { AgregarAreaService } from '../../../../areas/abm/agregar-area/services/agregar-area.service';
import { EliminarAreaService } from '../../../../areas/abm/eliminar-area/services/eliminar-area.service';
// tslint:disable-next-line
import { AgregarPuntoAtencionService } from '../../../../puntos-atencion/abm/agregar-punto-atencion/services/agregar-punto-atencion.service';
// tslint:disable-next-line
import { EliminarPuntoAtencionService } from '../../../../puntos-atencion/abm/eliminar-punto-atencion/services/eliminar-punto-atencion.service';
import { AgregarTramiteService } from '../../../../tramites/abm/agregar-tramite/services/agregar-tramite.service';
import { EliminarTramiteService } from '../../../../tramites/abm/eliminar-tramite/services/eliminar-tramite.service';
import { TestHelperTramite } from '../../../../tramites/abm/agregar-tramite/services/test-utilities';
export interface TestContext {
    organismoId: number,
    areaId: number[],
    puntoId: number,
    tramiteId: number
}

@Injectable()
export class TestHelperCategoria {

    constructor (
        private agregarOrganismoService: AgregarOrganismoService,
        private eliminarOrganismoService: EliminarOrganismoService,
        private agregarAreaService: AgregarAreaService,
        private eliminarAreaService: EliminarAreaService,
        private agregarPuntoAtencionService: AgregarPuntoAtencionService,
        private eliminarPuntoAtencionService: EliminarPuntoAtencionService,
        private eliminarTramiteService: EliminarTramiteService,
        private agregarTramiteService: AgregarTramiteService,
        private testHelperTramite: TestHelperTramite
    ) {}

    private createNuevoOrganismo () {
        const nuevoOrganismo: NuevoOrganismoForm = {
            nombre: 'Organismo Test 1',
            abreviatura: 'OT1'
        };
        return this.agregarOrganismoService.agregarOrganismo(nuevoOrganismo);
    }

    private eliminarOrganismo (orgId: number) {
        return this.eliminarOrganismoService.eliminarOrganismo(orgId);
    }

    private createNuevoArea (orgId: number) {
        const nuevaArea: NuevoAreaForm = {
            nombre: 'Area Test',
            abreviatura: 'AT1'
        };

        return this.agregarAreaService.agregarArea(orgId, nuevaArea);
    }

    private eliminarArea (orgId: number, areaId: number) {
        return this.eliminarAreaService.eliminarArea(orgId, areaId);
    }

    private createNuevoPuntoAtencion (areaId: number, tramiteId: number) {
        const punto: NuevoPuntoAtencionForm = {
            nombre: 'PDA nombre test',
            provincia: 1,
            localidad: 1,
            direccion: 'PDA direccion test',
            area: areaId,
            id: 0,
            estado: 1,
            tramites: [tramiteId]
        };
        return this.agregarPuntoAtencionService.agregarPuntoAtencion(punto);
    }

    createPuntoAtencionEditar(areaId: number, id: number) {
        const pdaEditar = {
            nombre: 'PDA editado test',
            provincia: 1,
            localidad: 1,
            direccion: 'PDA direccion test',
            area: areaId,
            id: id,
            estado: 1,
            tramites: []
        };
        return this.agregarPuntoAtencionService.editarPuntoAtencion(pdaEditar);
    }

    private eliminarPuntoAtencion(areaId: number, puntoId: number) {
        return this.createPuntoAtencionEditar(areaId, puntoId).flatMap((response: any) => {
            return this.eliminarPuntoAtencionService.eliminarPuntoAtencion(puntoId);
        });
    }

    createNuevoCategoria(puntoId: number, tramiteId: number): NuevaCategoriaForm {
        return {
            nombre: 'nombre test',
            id: 0,
            tramites: [tramiteId]
        }
    }

    createCategoriaEditar(puntoId: number, categoriaId: number, tramiteId: number): NuevaCategoriaForm {
        return {
            nombre: 'nombre test editado',
            id: categoriaId,
            tramites: [tramiteId]
        }
    }

    createTramite(areaId: number[]) {
        const tramite = this.testHelperTramite.createNuevoTramite(areaId);
        return this.agregarTramiteService.agregarTramite(tramite);
    }

    createContext(): Observable<TestContext> {
        return this.createNuevoOrganismo().flatMap((addOrganismoResponse: any) => {
            const organismoId: number = addOrganismoResponse.additional.id;

            return this.createNuevoArea(organismoId).flatMap((addAreaResponse: any) => {
                const areaId: number[] = addAreaResponse.additional.id;

                return this.createTramite(areaId).flatMap((response: any) => {
                    const tramiteId = response.additional.id;

                    return this.createNuevoPuntoAtencion(areaId[0], tramiteId).map((addPuntoResponse: any) => {
                        const puntoId: number = addPuntoResponse.additional.id;
                        return { organismoId: organismoId, areaId: areaId, puntoId: puntoId, tramiteId: tramiteId };
                    });
                })
            });
        });
    }

    removeContext(context: TestContext) {
        return this.eliminarPuntoAtencion(context.areaId[0], context.puntoId).flatMap((deletePuntoResponse: any) => {
            return this.eliminarTramiteService.eliminarTramite(context.tramiteId, context.areaId[0]).flatMap((response: any) => {
                return this.eliminarArea(context.organismoId, context.areaId[0]).flatMap((deleteAreaResponse: any) => {
                    return this.eliminarOrganismo(context.organismoId);
                })
            });
        });
    }

}

