import * as R from 'ramda';

export class ProvinciasImpl implements Provincias {

  provincias: Provincia[];
  size: number

  constructor(response: any) {
    const expectedKeys = ['metadata', 'result'];
    if (!R.equals(R.keys(response), expectedKeys)) {
      throw new TypeError('object doesnt match expected keys: ' + expectedKeys.toString());
    } else {
      this.provincias = response.result.map((provincia: any) => {
        const keys = ['id', 'nombre'];
        if (!R.equals(R.keys(provincia), keys)) {
          throw new TypeError('object doesnt match expected keys: ' + keys.toString());
        } else {
          return provincia as Provincia
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
