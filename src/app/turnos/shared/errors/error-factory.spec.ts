import * as jsc from '../../../../../node_modules/jsverify';
import { ErrorFactory } from './error-factory';
import { JscHelper } from '../testing/jsc-utilities';

function generator() {
    return jsc.record({
        userMessage: jsc.record({errors: jsc.record({key: jsc.string})})
    })
}

describe('Errores', () => {

    it('should be complete', () => {
        expect(jsc.checkForall(generator(), (response: any) => {
            const validation = ErrorFactory.create(response);
            return validation.isSuccess();
        })).toBeTruthy();

    });

    it('should be throw an error if the response does not match the expectation', () => {
        const minInteger = 1;
        const maxInteger = 5;
        expect(jsc.checkForall(generator(), jsc.integer(minInteger, maxInteger), (response: any, keyNumberToRemove: number) => {
            const validation = ErrorFactory.create(JscHelper.removeKeyFromSingleObject(response, keyNumberToRemove));
            return validation.isFail();
        })).toBeTruthy();
    });
});



