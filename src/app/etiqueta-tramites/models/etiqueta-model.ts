import * as R from 'ramda';

export class EtiquetasImpl implements EtiquetasPag {

    etiquetas: Etiqueta[];
    size: number

    constructor(response: any) {
        const expectedKeys = ['metadata', 'result'];
        if (!R.equals(R.keys(response), expectedKeys)) {
            throw new TypeError('object doesnt match expected keys: ' + expectedKeys.toString());
        } else {
            this.etiquetas = response.result.map((etiqueta: any): Etiqueta => {
                const keys = ['id', 'nombre', 'cantidadTramites'];
                if (!R.equals(keys, R.intersection(R.keys(etiqueta), keys))) {
                    throw new TypeError('object doesnt match expected keys: ' + keys.toString());
                } else {
                    return {
                        id: etiqueta.id,
                        nombre: etiqueta.nombre,
                        tramites: [],
                        cantidadTramites: etiqueta.cantidadTramites
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
