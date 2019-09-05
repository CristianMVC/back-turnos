import { Maybe, Validation } from 'monet';
import { ValidationError, PropertyObject, ValidationUtils } from '../../../shared/validations/validations';

export class PuntoAtencionFactory {

    static create(response: PropertyObject): Validation<ValidationError, TurnosPuntoAtencion[]> {
        return Maybe.fromNull(response).toValidation(ValidationError.of('response', 'response can not be null'))
            .flatMap((r: PropertyObject): Validation<ValidationError, PropertyObject> => {
                const expectedKeys = ['result'];
                return ValidationUtils.validateObject(expectedKeys, r, (element: PropertyObject) => {
                    return element.result;
                });
            }).flatMap((result: PropertyObject[]) => {
                const expectedKeys = ['id', 'nombre', 'provincia', 'localidad', 'direccion', 'latitud', 'longitud', 'disponible'];
                const validations = ValidationUtils.validateObjects<TurnosPuntoAtencion>(expectedKeys, result,
                     PuntoAtencionFactory.newPuntoAtencion);
                return ValidationUtils.createResult(validations);
            });
    }

    private static newPuntoAtencion(punto: any): TurnosPuntoAtencion {
        return {
            id: punto.id,
            nombre: punto.nombre,
            localidad: punto.localidad,
            provincia: punto.provincia,
            direccion: punto.direccion,
            coordenada: {
                latitud: punto.latitud,
                longitud: punto.longitud
            },
            disponible: punto.disponible
        }
    }
}
