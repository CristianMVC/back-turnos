import { Injectable } from '@angular/core';
import { AgregarOrganismoService, EliminarOrganismoService } from '../../../../organismos/abm/abm-organismo.module';
import { AgregarAreaService } from '../../../../areas/abm/agregar-area/services/agregar-area.service';
import { EliminarAreaService } from '../../../../areas/abm/eliminar-area/services/eliminar-area.service';

@Injectable()
export class TestHelperTramite {

    constructor (
        private agregarOrganismoService: AgregarOrganismoService,
        private eliminarOrganismoService: EliminarOrganismoService,
        private agregarAreaService: AgregarAreaService,
        private eliminarAreaService: EliminarAreaService
    ) {}
 
    createNuevoOrganismo () {
        const nuevoOrganismo: NuevoOrganismoForm = {
            nombre: 'Organismo Test tramite',
            abreviatura: 'OT1'
        };
        return this.agregarOrganismoService.agregarOrganismo(nuevoOrganismo);
    }

    eliminarOrganismo (orgId: number) {
        return this.eliminarOrganismoService.eliminarOrganismo(orgId);
    }

    createNuevoArea (orgId: number) {
        const nuevaArea: NuevoAreaForm = {
            nombre: 'Area Test tramite',
            abreviatura: 'OT1'
        };

        return this.agregarAreaService.agregarArea(orgId, nuevaArea);
    }

    eliminarArea (orgId: number, areaId: number) {
        return this.eliminarAreaService.eliminarArea(orgId, areaId);
    }

    createNuevoTramite (areaId: number[]): NuevoTramiteForm {
        return {
            area: areaId,
            idArgentinaGobAr: areaId[0],
            requisitos: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'Aliquam velit lectus, bibendum a arcu eget, fermentum dignissim nibh.',
                'In hac diego armandum e ma granti qui pele.'
            ],
            requisitosAsString: '',
            campos: [{
                'description': '',
                'formComponent': {
                    'typeValue': 'text'
                },
                'key': 'nombre',
                'label': 'Nombre',
                'order': 1,
                'required': true,
                'type': 'textbox'
            }],
            duracion: 60,
            visibilidad: 1,
            excepcional: 0,
            multiple: 0,
            multiple_max: 0,
            multiple_horizonte:30,
            nombre: 'Tramite test',
            descripcion: "test ",
            id: 0,
            org: false,
            miArgentina: false,
        };
    }

    createTramiteEditar (areaId: number[], tramiteId: number): NuevoTramiteForm {
        return {
            id: tramiteId,
            duracion: 60,
            visibilidad: 1,
            excepcional: 0,
            multiple: 0,
            multiple_max: 0,
            multiple_horizonte:30,
            nombre: 'Tramite test editado',
            descripcion: "test ",
            area: areaId,
            idArgentinaGobAr: areaId[0],
            requisitos: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'Aliquam velit lectus, bibendum a arcu eget, fermentum dignissim nibh.',
                'In hac diego armandum e ma granti qui pele.'
            ],
            requisitosAsString: '',
            campos: [{
                'description': '',
                'formComponent': {
                    'typeValue': 'text'
                },
                'key': 'nombre',
                'label': 'Nombre',
                'order': 1,
                'required': true,
                'type': 'textbox'
            }],
            org: false,
            miArgentina:false,
        };
    }
}
