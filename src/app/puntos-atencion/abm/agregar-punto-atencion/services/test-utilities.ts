import { Injectable } from '@angular/core';
import { AgregarOrganismoService, EliminarOrganismoService } from '../../../../organismos/abm/abm-organismo.module';
import { AgregarAreaService } from '../../../../areas/abm/agregar-area/services/agregar-area.service';
import { EliminarAreaService } from '../../../../areas/abm/eliminar-area/services/eliminar-area.service';

@Injectable()
export class TestHelperPuntoAtencion {

    constructor (
        private agregarOrganismoService: AgregarOrganismoService,
        private eliminarOrganismoService: EliminarOrganismoService,
        private agregarAreaService: AgregarAreaService,
        private eliminarAreaService: EliminarAreaService
    ) {}

    createNuevoOrganismo () {
        const nuevoOrganismo: NuevoOrganismoForm = {
            nombre: 'Organismo Test 1',
            abreviatura: 'OT1'
        };
        return this.agregarOrganismoService.agregarOrganismo(nuevoOrganismo);
    }

    eliminarOrganismo (orgId: number) {
        return this.eliminarOrganismoService.eliminarOrganismo(orgId);
    }

    createNuevoArea (orgId: number) {
        const nuevaArea: NuevoAreaForm = {
            nombre: 'Area Test 1',
            abreviatura: 'OT1'
        };

        return this.agregarAreaService.agregarArea(orgId, nuevaArea);
    }

    eliminarArea (orgId: number, areaId: number) {
        return this.eliminarAreaService.eliminarArea(orgId, areaId);
    }

    createNuevoPuntoAtencion (areaId: number) {
        return {
            nombre: 'PDA nombre test',
            provincia: 1,
            localidad: 1,
            direccion: 'PDA direccion test',
            area: areaId,
            id: 0,
            tramites: [1]
        };
    }

    createPuntoAtencionEditar(areaId: number, id: number) {
        return {
            nombre: 'PDA editado test',
            provincia: 1,
            localidad: 1,
            direccion: 'PDA direccion test',
            area: areaId,
            id: id,
            estado: 1,
            tramites: []
        };
    }
}
