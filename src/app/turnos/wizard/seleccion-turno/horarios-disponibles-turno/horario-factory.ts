import { Maybe, Validation } from 'monet';
import * as moment from 'moment';

import { ValidationError, PropertyObject, ValidationUtils } from '../../../shared/validations/validations';

export class HorarioFactory {

    static create(response: PropertyObject): Validation<ValidationError, Horario[]> {
        return Maybe.fromNull(response).toValidation(ValidationError.of('response', 'response can not be null'))
        .flatMap((r: PropertyObject): Validation<ValidationError, PropertyObject> => {
            const expectedKeys = ['result'];
            return ValidationUtils.validateObject(expectedKeys, r, (element: PropertyObject) => {
                return element.result;
            });
        })
        .flatMap((result: PropertyObject[]) => {
            const expectedKeys = ['horario', 'fecha', 'cantidadTurnos'];
            const validations = ValidationUtils.validateObjects<Horario>(expectedKeys, result, HorarioFactory.newHorario);
            return ValidationUtils.createResult(validations);
        });
    }

    private static newHorario(h: any): Horario {
        return {
            hora: h.horario,
            fecha: moment(h.fecha),
            disponible: h.cantidadTurnos > 0
        }
    }
}
