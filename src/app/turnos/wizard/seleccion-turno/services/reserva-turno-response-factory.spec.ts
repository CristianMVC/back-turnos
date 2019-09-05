import * as jsc from '../../../../../../node_modules/jsverify';
import { ReservaTurnoResponseFactory } from './reserva-turno-response-factory';
import { JscHelper } from '../../../shared/testing/jsc-utilities';
import * as R from 'ramda';


describe('ReservaTurnoResponse', () => {

    it('should be complete', () => {

        const generator = jsc.record({
            additional: jsc.record( { id: jsc.number, codigo: jsc.string })
        });

        expect(jsc.checkForall(generator, (response: any) => {
            const validation = ReservaTurnoResponseFactory.create(response);
            const reservaTurnoResponse = validation.success();
            return validation.isSuccess() && R.not(R.isNil(reservaTurnoResponse));
        })).toBeTruthy();

    });

    it('should be throw an error if the response does not match the expectation', () => {

        const generator = jsc.record({
            additional: jsc.record( { id: jsc.number, codigo: jsc.string })
        });

        const maxNatNumbers = 30;
        expect(jsc.checkForall(generator, jsc.nat(maxNatNumbers), (response: any, keyNumberToRemove: number) => {
            const validation = ReservaTurnoResponseFactory.create(JscHelper.removeKeyFromObject(response, keyNumberToRemove));
            return validation.isFail() && R.not(R.isNil(validation.fail().result));
        })).toBeTruthy();
    });
});

