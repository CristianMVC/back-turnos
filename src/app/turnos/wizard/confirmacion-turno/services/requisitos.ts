import * as R from 'ramda';

export class Requisitos {

    static asList(response: any): Requisito[] {
        const expectedKeys = 'result';
        if (R.not(R.contains(expectedKeys, R.keys(response)))) {
            throw new TypeError('object doesnt match expected keys: ' + expectedKeys.toString());
        } else {
                const keys = ['id', 'requisitos'];
                if (!R.equals(R.keys(response.result), keys)) {
                    throw new TypeError('object does not match expected keys: ' + keys.toString());
                } else {
                    return response.result.requisitos
                }
        }
    }
}
