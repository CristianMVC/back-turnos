import * as R from 'ramda';

export class LocalidadesImpl implements Localidades {

  localidades: Localidad[];
  size: number

  constructor(response: any) {
    const expectedKeys = ['metadata', 'result'];
    if (!R.equals(R.keys(response), expectedKeys)) {
      throw new TypeError('object doesnt match expected keys: ' + expectedKeys.toString());
    } else {
      this.localidades = response.result.map((localidad: any) => {
        const keys = ['id', 'nombre'];
        if (!R.equals(R.keys(localidad), keys)) {
          throw new TypeError('object doesnt match expected keys: ' + keys.toString());
        } else {
          return localidad as Localidad
        }
      })
    }
    if (R.isNil(R.view(R.lensPath(['metadata']), response))) {
      throw new TypeError('object doesnt match expected keys: ' + ['count'].toString());
    } else {
      this.size = 0;
    }
  }
}


