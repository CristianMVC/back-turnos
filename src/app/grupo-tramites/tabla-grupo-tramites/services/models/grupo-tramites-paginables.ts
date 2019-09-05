import * as R from 'ramda';

export class GrupoTramitesPaginablesImpl implements GrupoTramitesPaginables {

    grupos: GrupoTramites[];
    size: number

    constructor(response: any) {
        const expectedKeys = ['metadata', 'result'];
        if (!R.equals(R.keys(response), expectedKeys)) {
            throw new TypeError('object doesnt match expected keys: ' + expectedKeys.toString());
        } else {
            this.grupos = response.result.map((grupo: any): GrupoTramites => {
                const keys = ['id', 'nombre', 'horizonte', 'intervalo', 'tramites'];
                if (!R.equals(R.keys(grupo), keys)) {
                    throw new TypeError('object doesnt match expected keys: ' + keys.toString());
                } else {
                    return {
                        id: grupo.id,
                        nombre: grupo.nombre,
                        horizonte: grupo.horizonte,
                        intervalo: grupo.intervalo,
                        tramites: grupo.tramites,
                        cantidadTramites: grupo.tramites.length
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
