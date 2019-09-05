import * as R from 'ramda';

export class OrganismosPaginablesImpl implements OrganismosPaginables {

  organismos: Organismo[];
  size: number

  constructor(response: any) {
    const expectedKeys = ['metadata', 'result'];
    if (!R.equals(R.keys(response), expectedKeys)) {
      throw new TypeError('object doesnt match expected keys: ' + expectedKeys.toString());
    } else {
      this.organismos = response.result.map((org: any) => {
        const keys = ['id', 'nombre', 'abreviatura'];
        if (!R.equals(R.keys(org), keys)) {
          throw new TypeError('object doesnt match expected keys: ' + keys.toString());
        } else {
          return {
            id: org.id,
            nombre: org.nombre,
            abreviatura: org.abreviatura,
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
