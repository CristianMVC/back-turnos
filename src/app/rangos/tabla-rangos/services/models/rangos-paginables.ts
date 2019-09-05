import * as R from 'ramda';

export class RangosPaginablesImpl implements RangosPaginables {

    rangos: Rango[];
    size: number

    constructor(response: any) {
        const expectedKeys = ['metadata', 'result'];
        if (!R.equals(R.keys(response), expectedKeys)) {
            throw new TypeError('object doesnt match expected keys: ' + expectedKeys.toString());
        } else {
            this.rangos = response.result.map((rango: any): Rango => {
                const keys = ['idRow', 'horaInicio', 'horaFin', 'diasSemana'];
                if (!R.equals(R.keys(rango), keys)) {
                    throw new TypeError('object doesnt match expected keys: ' + keys.toString());
                } else {
                    return {
                        'idRow': rango.idRow,
                        'horaInicio': rango.horaInicio,
                        'horaFin': rango.horaFin,
                        'diasSemana': rango.diasSemana
                    }
                }
            })
        }
        if (response.metadata) {
            this.size = response.metadata.count;
        }
    }
}
