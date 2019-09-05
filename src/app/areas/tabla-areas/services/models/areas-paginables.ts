import * as R from 'ramda';

export class AreasPaginablesImpl implements AreasPaginables {

  areas: Area[];
  size: number

  constructor(response: any) {
    const expectedKeys = ['metadata', 'result'];
    if (!R.equals(R.keys(response), expectedKeys)) {
      throw new TypeError('object doesnt match expected keys: ' + expectedKeys.toString());
    } else {
      this.areas = response.result.map((area: any) => {
        const keys = ['id', 'nombre', 'abreviatura'];
        if (!R.equals(R.keys(area), keys)) {
          throw new TypeError('object doesnt match expected keys: ' + keys.toString());
        } else {
          return {
            id: area.id,
            nombre: area.nombre,
            abreviatura: area.abreviatura
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
