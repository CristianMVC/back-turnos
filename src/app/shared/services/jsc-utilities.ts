function removeKey(response: any, key: string): any {
    if (key.includes('result.')) {
      const radix = 10;
      const keys = key.split('.').filter((k) =>  isNaN(parseInt(k, radix)) );
      response.result = response.result.map((r: any) => { R.dissoc(keys[1], r) })
      return response;
    } else {
      const keys = key.split('.');
      return R.dissocPath(keys, response);
    }
 }

 function getKeyToRemove(flattenObject: any, numberKey: number) {
     const keys = R.keys(flattenObject)
     const indexToRemove = numberKey < keys.length ? 0 : numberKey % keys.length;
     return keys[indexToRemove];
 }

function flattenObj(obj: any) {
    function go(obj_: any): any {
        return R.chain(function ([k, v]) {
            if (typeof v === 'object') {
                return R.map(function ([k_, v_]) { return [`${k}.${k_}`, v_] }, go(v))
            } else {
                return [[k, v]]
            }
        }, R.toPairs(obj_))
    }

    return R.fromPairs(go(obj))
}

function removeKeyFromObject(response: any, keyNumber: number) {
     const key = getKeyToRemove(flattenObj(response), keyNumber);
     return removeKey(response, key);
}
