import * as R from 'ramda';

export class TramitesPaginablesImpl implements TramitesPdaPaginables {

    tramites: TramitePda[];
    size: number

    constructor(response: any) {
        const expectedKeys = ['metadata', 'result'];
        if (!R.equals(R.keys(response), expectedKeys)) {
            throw new TypeError('object doesnt match expected keys: ' + expectedKeys.toString());
        } else {
            this.tramites = response.result.map((tramite: any): TramitePda => {
                // TODO fix when endpoint done
                const keys = ['id', 'nombre', 'visibilidad', 'estado', 'grupo_tramite_id','idCat', 'miArgentina'];
                if (!R.equals(R.keys(tramite), keys)) {
                    throw new TypeError('object doesnt match expected keys: ' + keys.toString());
                } else {
                    return {
                        id: tramite.id,
                        nombre: tramite.nombre,
                        visibilidad: tramite.visibilidad,
                        estado: tramite.estado,
                        grupo_tramite_id: tramite.grupo_tramite_id
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
