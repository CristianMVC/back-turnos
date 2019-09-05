import * as jsc from '../../../../../../node_modules/jsverify';
import * as R from 'ramda';
import { Localidades } from './localidades';
import { JscHelper } from '../../../shared/testing/jsc-utilities';

describe('Localidades', () => {

    it('should be complete', () => {
        const generator = jsc.record({
            result: jsc.nearray(jsc.record({ id: jsc.nat, nombre: jsc.string }))
        });

        expect(jsc.checkForall(generator, (response: any) => {
            const validation = Localidades.asList(response);
            const localidades = validation.success();
            return validation.isSuccess() && localidades.length > 0 && R.has('id', localidades[0]) && R.has('nombre', localidades[0]);
        })).toBeTruthy();
    });

    it('should be throw an error if the response does not match the expectation', () => {
        const generator = jsc.record({
            result: jsc.nearray(jsc.record({ id: jsc.nat, nombre: jsc.string }))
        });

        const maxNatNumbers = 30;
        expect(jsc.checkForall(generator, jsc.nat(maxNatNumbers), (response: any, keyNumberToRemove: number) => {
            const validation = Localidades.asList(JscHelper.removeKeyFromObject(response, keyNumberToRemove));
            return validation.isFail() && validation.fail().fails.length > 0;
        })).toBeTruthy();
    });
});

