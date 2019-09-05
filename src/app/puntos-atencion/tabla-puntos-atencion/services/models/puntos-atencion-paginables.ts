import * as R from 'ramda';

export class PuntosAtencionPaginablesImpl implements PuntosAtencionPaginables {

  puntosAtencion: PuntoAtencion[];
  size: number

  constructor(response: any) {
    const expectedKeys = ['metadata', 'result'];
    if (!R.equals(R.keys(response), expectedKeys)) {
      throw new TypeError('object doesnt match expected keys: ' + expectedKeys.toString());
    } else {
      this.puntosAtencion = response.result.map((punto: any) => {
        const keys = ['id', 'nombre', 'area', 'provincia', 'localidad', 'direccion', 'latitud', 'longitud'];
        if (!R.equals(R.keys(punto), keys)) {
          throw new TypeError('object doesnt match expected keys: ' + keys.toString());
        } else {
          return punto;
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
