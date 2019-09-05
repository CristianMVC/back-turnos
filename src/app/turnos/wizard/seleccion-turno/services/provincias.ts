import { Maybe, Validation } from 'monet';
import { ValidationError, PropertyObject, ValidationUtils } from '../../../shared/validations/validations';

export class Provincias {

    static asList(response: PropertyObject): Validation<ValidationError, Provincia[]> {
        return Maybe.fromNull(response).toValidation(ValidationError.of('response', 'response can not be null'))
            .flatMap((r: PropertyObject): Validation<ValidationError, PropertyObject> => {
                const expectedKeys = ['result'];
                return ValidationUtils.validateObject(expectedKeys, r, (element: PropertyObject) => {
                    return element.result;
                });
            })
            .flatMap((result: PropertyObject[]) => {
                const expectedKeys = ['id', 'nombre'];
                const validations = ValidationUtils.validateObjects<Provincia>(expectedKeys, result, Provincias.create);
                return ValidationUtils.createResult(validations);
            });
    }

    private static create(element: any): Provincia {
        return { id: element.id, nombre: element.nombre }
    }
}

