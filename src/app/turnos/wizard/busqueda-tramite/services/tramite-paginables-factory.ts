import { Maybe, Validation } from 'monet';
import { ValidationError, PropertyObject, ValidationUtils } from '../../../shared/validations/validations';

export class TramitePaginablesFactory {

    static create(response: any): Validation<ValidationError, TurnosTramitesPaginables> {
        const countValidation: Validation<ValidationError, number> = this.countValidation(response);
        const tramiteValidation: Validation<ValidationError, TurnosTramite[]> = this.tramiteValidation(response);
        return countValidation.chain<TurnosTramitesPaginables>((count: number) => {
            return tramiteValidation.map<TurnosTramitesPaginables>((values: TurnosTramite[]) => {
                return {tramites: values, size: count }
            });
        });
    }

    private static countValidation(response: any) {
        return Maybe.fromNull(response).toValidation(ValidationError.of('response', 'response can not be null'))
            .flatMap((r: PropertyObject): Validation<ValidationError, PropertyObject> => {
                const expectedKeys = ['metadata'];
                return ValidationUtils.validateObject<PropertyObject>(expectedKeys, r, (element: PropertyObject) => {
                    return element.metadata
                });
            })
            .flatMap((metadada: PropertyObject): Validation<ValidationError, PropertyObject> => {
                const expectedKeys = ['resultset'];
                return ValidationUtils.validateObject(expectedKeys, metadada, (element: PropertyObject) => {
                    return element.resultset
                });
            })
            .flatMap((metadada: PropertyObject): Validation<ValidationError, number> => {
                const expectedKeys = ['count'];
                return ValidationUtils.validateObject(expectedKeys, metadada, (element: PropertyObject): number => {
                    return element.count;
                });
            })
    }

    private static tramiteValidation(response: any): Validation<ValidationError, TurnosTramite[]> {
        return Maybe.fromNull(response).toValidation(ValidationError.of('response', 'response can not be null'))
            .flatMap((r: PropertyObject): Validation<ValidationError, PropertyObject> => {
                const expectedKeys = ['result'];
                return ValidationUtils.validateObject<PropertyObject>(expectedKeys, r, (element: PropertyObject) => {
                    return element.result
                });
            })
            .flatMap((r: PropertyObject[]): Validation<ValidationError, TurnosTramite[]> => {
                const expectedKeys = ['id', 'nombre', 'area', 'organismo'];
                const validations = ValidationUtils.validateObjects<TurnosTramite>(expectedKeys, r, this.createTramite);
                return ValidationUtils.createResult(validations);
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

