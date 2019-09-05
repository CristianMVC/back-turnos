import * as R from 'ramda';

export class CategoriasPaginablesImpl implements CategoriasPaginables {

    categorias: Categoria[];
    size: number

    constructor(response: any) {
        const expectedKeys = ['metadata', 'result'];
        if (!R.equals(R.keys(response), expectedKeys)) {
            throw new TypeError('object doesnt match expected keys: ' + expectedKeys.toString());
        } else {
            this.categorias = response.result.map((categoria: any): Categoria => {
                const keys = ['id', 'nombre', 'cantidadTramites'];
                if (!R.equals(keys, R.intersection(R.keys(categoria), keys))) {
                    throw new TypeError('object doesnt match expected keys: ' + keys.toString());
                } else {
                    return {
                        id: categoria.id,
                        nombre: categoria.nombre,
                        tramites: [],
                        cantidadTramites: categoria.cantidadTramites
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
