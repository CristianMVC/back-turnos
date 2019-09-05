import { Maybe, Validation } from 'monet';
import { ValidationError, PropertyObject, ValidationUtils } from '../validations/validations';


export class ErrorFactory {

    static create(response: any): Validation<ValidationError, TurnosErrorSNT> {
        return Maybe.fromNull(response).toValidation(ValidationError.of('response', 'response can not be null'))
        .flatMap((r: PropertyObject): Validation<ValidationError, PropertyObject> => {
            const expectedKeys = ['userMessage'];
            return ValidationUtils.validateObject<PropertyObject>(expectedKeys, r, (element: PropertyObject) => {
                return element.userMessage
            })
        })
        .flatMap((r: PropertyObject): Validation<ValidationError, TurnosErrorSNT> => {
            const expectedKeys = ['errors'];
            return ValidationUtils.validateObject<TurnosErrorSNT>(expectedKeys, r, this.createError);
        })
    }

    private static createError(element: any): TurnosErrorSNT {
        return element;
    }


}

