import * as moment from 'moment';
import { Maybe, Validation } from 'monet';
import { ValidationError, PropertyObject, ValidationUtils } from '../../shared/validations/validations';

export class ResultadoBusquedaTurnoFactory {

    static create(response: any): Validation<ValidationError, ResultadoBusquedaTurno> {
        return ResultadoBusquedaTurnoFactory.validateResults(response)
        .flatMap((result: PropertyObject): Validation<ValidationError, PropertyObject> => {
            return  ResultadoBusquedaTurnoFactory.validateProperties(result);
        }).flatMap((r: PropertyObject): Validation<ValidationError, PropertyObject> => {
            return ResultadoBusquedaTurnoFactory.validateTramite(r.tramite, (element: PropertyObject) => r);
        }).flatMap((r: PropertyObject): Validation<ValidationError, PropertyObject> => {
            return ResultadoBusquedaTurnoFactory.validateArea(r.area, (element: PropertyObject) =>  r );
        }).flatMap((r: PropertyObject): Validation<ValidationError, PropertyObject> => {
            return ResultadoBusquedaTurnoFactory.validatePuntoAtencion(r.punto_atencion, (element: PropertyObject) => r );
        }).flatMap((r: PropertyObject): Validation<ValidationError, PropertyObject> => {
            return ResultadoBusquedaTurnoFactory.validateCamposFormulario(r.datos_turno, (element: PropertyObject) => r );
        }).map<ResultadoBusquedaTurno>((r: PropertyObject): ResultadoBusquedaTurno => {
            return ResultadoBusquedaTurnoFactory.createResultado(r);
        })
    }

    private static validateProperties(element: PropertyObject): Validation<ValidationError, PropertyObject> {
        return Maybe.fromNull(element).toValidation(ValidationError.of('element', 'element can not be null'))
            .flatMap((result: PropertyObject) => {
                const expectedKeys = ['id', 'codigo', 'alerta', 'fecha', 'hora', 'estado', 'tramite', 'punto_atencion', 'datos_turno'];
                return ValidationUtils.validateObject<PropertyObject>(expectedKeys, result, (e: PropertyObject) => {
                    return e;
                });
            });
    }

    private static validateResults(element: any): Validation<ValidationError, PropertyObject> {
        return Maybe.fromNull(element).toValidation(ValidationError.of('response', 'response can not be null'))
        .flatMap((r: PropertyObject): Validation<ValidationError, PropertyObject> => {
                const expectedKeys = ['result'];
                return ValidationUtils.validateObject(expectedKeys, r, (e: PropertyObject) => {
                    return e.result;
                });
        })
    }


    private static validateTramite(element: any, next: (x: PropertyObject) => PropertyObject): Validation<ValidationError, PropertyObject> {
        return Maybe.fromNull(element).toValidation(ValidationError.of('tramite', 'tramite can not be null'))
            .flatMap((r: PropertyObject): Validation<ValidationError, PropertyObject> => {
                const expectedKeys = ['id', 'nombre'];
                return ValidationUtils.validateObject(expectedKeys, r, next);
            });
    }

    private static validateArea(element: any, next: (x: PropertyObject) => PropertyObject): Validation<ValidationError, PropertyObject> {
        return Maybe.fromNull(element).toValidation(ValidationError.of('area', 'area can not be null'))
            .flatMap((r: PropertyObject): Validation<ValidationError, PropertyObject> => {
                const expectedKeys = ['id', 'nombre', 'abreviatura'];
                return ValidationUtils.validateObject(expectedKeys, r, next);
            });
    }

    // tslint:disable-next-line:max-line-length
    private static validatePuntoAtencion(element: any, next: (x: PropertyObject) => PropertyObject): Validation<ValidationError, PropertyObject> {
        return Maybe.fromNull(element).toValidation(ValidationError.of('area', 'area can not be null'))
            .flatMap((r: PropertyObject): Validation<ValidationError, PropertyObject> => {
                const expectedKeys = ['id', 'nombre', 'direccion', 'latitud', 'longitud', 'provincia', 'localidad'];
                return ValidationUtils.validateObject(expectedKeys, r, next);
            });
    }

    // tslint:disable-next-line:max-line-length
    private static validateCamposFormulario(element: any, next: (x: PropertyObject) => PropertyObject): Validation<ValidationError, PropertyObject> {
        return Maybe.fromNull(element).toValidation(ValidationError.of('datos_turno', 'datos_turno can not be null'))
            .flatMap((r: PropertyObject): Validation<ValidationError, PropertyObject> => {
                const expectedKeys = ['campos']
                return ValidationUtils.validateObject(expectedKeys, r, next);
            });
    }

    private static createResultado(result: PropertyObject): ResultadoBusquedaTurno {
        return  {
                id: result.id,
                codigo: result.codigo,
                alerta: result.alerta,
                fecha: moment(result.fecha),
                hora: result.hora,
                tramite: {
                    id: result.tramite.id,
                    nombre: result.tramite.nombre
                },
                estado: result.estado,
                nombreArea: result.area.nombre,
                puntoAtencion: {
                    id: result.punto_atencion.id,
                    nombre: result.punto_atencion.nombre,
                    direccion: result.punto_atencion.direccion,
                    coordenada: {
                        latitud: result.punto_atencion.latitud,
                        longitud: result.punto_atencion.longitud
                    },
                    localidad: result.punto_atencion.localidad,
                    provincia: result.punto_atencion.provincia,
                    disponible: result.punto_atencion.disponible
                },
                turno: {
                    id: result.id,
                    codigo: result.codigo,
                    alerta: result.alerta,
                    campos: result.datos_turno.campos
                }
            };
    }
}
