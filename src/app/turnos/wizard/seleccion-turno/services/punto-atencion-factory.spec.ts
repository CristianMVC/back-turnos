import * as jsc from '../../../../../../node_modules/jsverify';
import { PuntoAtencionFactory } from './punto-atencion-factory';
import { JscHelper } from '../../../shared/testing/jsc-utilities';

describe('PuntosAtencion', () => {

    it('should be complete', () => {

        const generator = jsc.record({
            result: jsc.nearray(jsc.record(
                {
                    id: jsc.nat, nombre: jsc.string, provincia: jsc.string, localidad: jsc.string,
                    direccion: jsc.string, latitud: jsc.number, longitud: jsc.number
                }))
        });

        expect(jsc.checkForall(generator, (response: any) => {
            const validation = PuntoAtencionFactory.create(response);
            const puntosAtencion = validation.success();
            return validation.isSuccess() && puntosAtencion.length > 0;
        })).toBeTruthy();

    });

    it('should be throw an error if the response does not match the expectation', () => {
        const generator = jsc.record({
            result: jsc.nearray(jsc.record(
                {
                    id: jsc.nat, nombre: jsc.string, provincia: jsc.string, localidad: jsc.string,
                    direccion: jsc.string, latitud: jsc.number, longitud: jsc.number
                }))
        });

        const maxNatNumbers = 30;
        expect(jsc.checkForall(generator, jsc.nat(maxNatNumbers), (response: any, keyNumberToRemove: number) => {
            const validation = PuntoAtencionFactory.create(JscHelper.removeKeyFromObject(response, keyNumberToRemove));
            return validation.isFail() && validation.fail().fails.length > 0;
        })).toBeTruthy();
    });
});

