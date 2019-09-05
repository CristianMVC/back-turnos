import * as jsc from '../../../../../../node_modules/jsverify';
import * as R from 'ramda';
import { Requisitos } from './requisitos';
import { JscHelper } from '../../../shared/testing/jsc-utilities';

describe('Requisitos', () => {

    it('should be complete', () => {
        const generator = jsc.record({
            result: jsc.record({ id: jsc.nat, requisitos: jsc.nearray(jsc.string) })
        });

        expect(jsc.checkForall(generator, (response: any) => {
            const requisitos = Requisitos.asList(response);
            if (requisitos.length > 0) {
                return R.all((requisito) => {
                    return R.not(R.isNil(requisito));
                })(requisitos);
            } else {
                return true;
            }
        })).toBeTruthy();
    });

    it('should be throw an error if the response does not match the expectation', () => {
        const generator = jsc.record({
            result: jsc.record({ id: jsc.nat, requisitos: jsc.constant([]) })
        });

        const maxNatNumbers = 30;
        expect(jsc.checkForall(generator, jsc.nat(maxNatNumbers), (response: any, keyNumberToRemove: number) => {
            try {
                Requisitos.asList(JscHelper.removeKeyFromObject(response, keyNumberToRemove));
                return false;
            } catch (error) {
                return true;
            }
        })).toBeTruthy();
    });
});

