import * as jsc from '../../../../../node_modules/jsverify';
import { ResultadoBusquedaTurnoFactory } from './resultado-busqueda-turno-factory';
import { JscHelper } from '../../shared/testing/jsc-utilities';
import * as R from 'ramda';

describe('ResultadoBusquedaTurno', () => {

    it('should be complete', () => {

        const generator = createGenerator();

        expect(jsc.checkForall(generator, (response: any) => {
            const validation = ResultadoBusquedaTurnoFactory.create({ result: response });
            const resultadoBusquedaTurno = validation.success();
            return validation.isSuccess() && R.not(R.isNil(resultadoBusquedaTurno));
        })).toBeTruthy();

    });

    it('should be throw an error if the response does not match the expectation', () => {
        const generator = createGenerator();

        const maxNatNumbers = 30;
        expect(jsc.checkForall(generator, jsc.nat(maxNatNumbers), (response: any, keyNumberToRemove: number) => {
            const validation = ResultadoBusquedaTurnoFactory.create(
                JscHelper.removeKeyFromObject({ result: response }, keyNumberToRemove));
            return validation.isFail() && validation.fail().toArray().length > 0;
        })).toBeTruthy();
    });

    function createGenerator() {
        return jsc.record(
            {
                id: jsc.nat, codigo: jsc.string, alerta: jsc.string, fecha: JscHelper.dateAsStringGenerator, hora: jsc.string,
                tramite: jsc.record({ id: jsc.string, nombre: jsc.string }),
                estado: jsc.string,
                area: jsc.record({
                    id: jsc.nat,
                    nombre: jsc.string,
                    abreviatura: jsc.string
                }),
                punto_atencion: jsc.record({
                    id: jsc.nat,
                    nombre: jsc.string,
                    direccion: jsc.string,
                    latitud: jsc.nat,
                    longitud: jsc.nat,
                    localidad: jsc.string,
                    provincia: jsc.string
                }),
                datos_turno: jsc.record({
                    campos: jsc.json
                })
            });
    }

});



