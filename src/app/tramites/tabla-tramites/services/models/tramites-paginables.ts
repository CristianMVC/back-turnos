import * as R from 'ramda';

export class TramitesPaginablesImpl implements TramitesPaginables {

    tramites: Tramite[];
    size: number

    constructor(response: any) {
        const expectedKeys = ['metadata', 'result'];

        if (!R.equals(R.keys(response), expectedKeys)) {
            throw new TypeError('object doesnt match expected keys: ' + expectedKeys.toString());
        } else {
            this.tramites = response.result.map((tramite: any): Tramite => {

                const keys = ['id',  'nombre', 'descripcion', 'duracion', 'visibilidad', 'org','punto_atencion_id','grupo_tramite_id','idCat','miArgentina'];

                if (!R.equals(R.keys(tramite), keys)) {
                    throw new TypeError('object doesnt match expected keys: ' + keys.toString());
                } else {
                    return {
                        id: tramite.id,
                        nombre: tramite.nombre,
                        descripcion: tramite.descripcion,
                        duracion: tramite.duracion,
                        visibilidad: tramite.visibilidad,
                        estado: tramite.visibilidad === 1 ? 'Habilitado' : 'Deshabilitado',
                        campos: tramite.campos,
                        multiple: tramite.multiple,
                        multiple_max: tramite.multiple_max,
                        multiple_horizonte:tramite.multiple_horizonte,
                        org: tramite.org,
                        punto_atencion_id: tramite.punto_atencion_id,
                        grupo_tramite_id: tramite.grupo_tramite_id,
                        miArgentina: tramite.miArgentina
                    }
                }
            })
        }
        if (R.isNil(R.view(R.lensPath(['metadata', 'resultset', 'count']), response))) {
            throw new TypeError('object doesnt match expected keys: ' + ['count'].toString());
        } else {
            this.size = response.metadata.resultset.count;
        }
    }
}