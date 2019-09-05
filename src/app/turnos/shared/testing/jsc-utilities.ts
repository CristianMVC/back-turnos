import * as R from 'ramda';
import * as moment from 'moment';
import * as jsc from '../../../../../node_modules/jsverify';

const removeKey = function (response: any, key: string): any {
    const radix = 10;
    const keys = key.split('.');
    const index = R.findIndex((s: string) =>  !isNaN(parseInt(s, radix)) )(keys);
    if (index >= 0) {
        const beforeArrayKeys = R.slice(0, index, keys);
        const afterArrayKeys = R.slice(index + 1, keys.length, keys);
        if (afterArrayKeys.length > 0) {
            const array = R.path(beforeArrayKeys, response) as any[];
            array[index] = R.dissocPath(afterArrayKeys, array[index]);
            return R.assocPath(beforeArrayKeys, array, response);
        } else {
            // tslint:disable-next-line:max-line-length
            return R.assocPath(beforeArrayKeys, R.remove(parseInt(keys[index], radix), 1, R.path(beforeArrayKeys, response) as any[]), response);
        }
    } else {
        return R.dissocPath(keys, response);
    }
}

const getKeyToRemove = function(flattenObject: any, numberKey: number) {
     const keys = R.keys(flattenObject)
     const indexToRemove = numberKey < keys.length ? 0 : numberKey % keys.length;
     return keys[indexToRemove];
 }

const flattenObj = function (obj: any) {
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

const removeKeyFromObject = function(response: any, keyNumber: number) {
     const key = getKeyToRemove(flattenObj(response), keyNumber);
     return removeKey(response, key);
}

const dateAsStringGenerator = jsc.datetime.smap<string>((d: Date) => {
    return moment(d).format('Y-MM-DD');
}, (s: string) => {
    return moment(s).toDate();
});

const removeKeyFromSingleObject = (response: any, keyNumber: number) => {
    const key = getKeyToRemove(flattenObj(response), keyNumber);
    const keys = key.split('.');
    if (keyNumber >= keys.length) {
        return R.dissocPath(keys.slice(0, keys.length - 1), response);
    } else {
        return R.dissocPath(keys.slice(0, keyNumber), response);
    }
}

export const JscHelper = { removeKeyFromObject: removeKeyFromObject,
    dateAsStringGenerator: dateAsStringGenerator,
    removeKeyFromSingleObject: removeKeyFromSingleObject }
