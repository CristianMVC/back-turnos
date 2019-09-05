import * as jsc from '../../../../../../node_modules/jsverify';
import { HorarioFactory } from './horario-factory';
import { JscHelper } from '../../../shared/testing/jsc-utilities';


describe('Horarios', () => {

    it('should be complete', () => {

        const generator = jsc.record({
            result: jsc.nearray(jsc.record(
                {
                    horario: jsc.string, fecha: JscHelper.dateAsStringGenerator, cantidadTurnos: jsc.number
                }))
        });

        expect(jsc.checkForall(generator, (response: any) => {
            const validation = HorarioFactory.create(response);
            const horarios = validation.success();
            return validation.isSuccess() && horarios.length > 0;
        })).toBeTruthy();

    });

    it('should be throw an error if the response does not match the expectation', () => {

        const generator = jsc.record({
            result: jsc.nearray(jsc.record(
                {
                    horario: jsc.string, fecha: JscHelper.dateAsStringGenerator, cantidadTurnos: jsc.number
                }))
        });

        const maxNatNumbers = 30;
        expect(jsc.checkForall(generator, jsc.nat(maxNatNumbers), (response: any, keyNumberToRemove: number) => {
            const validation = HorarioFactory.create(JscHelper.removeKeyFromObject(response, keyNumberToRemove));
            return validation.isFail() && validation.fail().fails.length > 0;
        })).toBeTruthy();
    });
});

