import { Maybe, Validation } from 'monet';
import { ValidationError, PropertyObject, ValidationUtils } from '../../../shared/validations/validations';

export class ReservaTurnoResponseFactory {

    static create(response: PropertyObject): Validation<ValidationError, ReservaTurnoResponse> {
        return Maybe.fromNull(response).toValidation(ValidationError.of('response', 'response can not be null'))
        .flatMap((r: PropertyObject): Validation<ValidationError, PropertyObject> => {
            const expectedKeys = ['additional'];
            return ValidationUtils.validateObject(expectedKeys, r, (element: PropertyObject) => {
                return element.additional;
            });
        })
        .flatMap((additional: PropertyObject) => {
            const expectedKeys = ['id', 'codigo'];
            return ValidationUtils.validateObject<ReservaTurnoResponse>(expectedKeys, additional, ReservaTurnoResponseFactory.newReserva);
        });

    }

    private static newReserva(object: any): ReservaTurnoResponse {
        return { turnoId: object.id, codigo: object.codigo }
    }
}
