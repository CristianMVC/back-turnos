import { Maybe, Validation } from 'monet';
import { ValidationError, PropertyObject, ValidationUtils } from '../../../shared/validations/validations';

export class TramiteFactory {

    static create(response: any): Validation<ValidationError, TurnosTramite> {
        return Maybe.fromNull(response).toValidation(ValidationError.of('response', 'response can not be null'))
            .flatMap((r: PropertyObject): Validation<ValidationError, PropertyObject> => {
                const expectedKeys = ['result'];
                return ValidationUtils.validateObject<PropertyObject>(expectedKeys, r, (element: PropertyObject) => {
                    return element.result
                });
            })
            .flatMap((r: PropertyObject): Validation<ValidationError, TurnosTramite> => {
                const expectedKeys = ['id', 'nombre', 'area', 'organismo'];
                return ValidationUtils.validateObject<TurnosTramite>(expectedKeys, r, this.createTramite);
            })
    }

    private static createTramite(element: any): TurnosTramite {
        return {
            id: element.id,
            nombre: element.nombre,
            area: element.area,
            organismo: element.organismo
        }
    }

}

