import { Maybe, Validation } from 'monet';
import { ValidationError, PropertyObject, ValidationUtils } from '../../../../shared/validations/validations';

export class GrupoTramiteReasignacionFactory {

     static grupoTramiteReasignacionValidation(response: BackOfficeResponse<GrupoTramiteReasignacion>):
      Validation<ValidationError, GrupoTramiteReasignacion> {
        return Maybe.fromNull(response).toValidation(ValidationError.of('response', 'response can not be null'))
        .flatMap((r: PropertyObject): Validation<ValidationError, GrupoTramiteReasignacion> => {
            const expectedKeys = ['result'];
            return ValidationUtils.validateObject(expectedKeys, r, (element: PropertyObject) => {
                return <GrupoTramiteReasignacion>element.result;
            })
        })
        .flatMap((r: GrupoTramiteReasignacion): Validation<ValidationError, GrupoTramiteReasignacion> => {
            const expectedKeys = ['id', 'nombre', 'total_turnos', 'fechas'];
            return ValidationUtils.validateObject(expectedKeys, r, this.createGrupoTramiteReasignacion)
        })
    }

    private static createGrupoTramiteReasignacion(element: any): GrupoTramiteReasignacion {
        return {
            id: element.id,
            totalTurnos: element.total_turnos,
            fechas: element.fechas,
            nombre: element.nombre
        }
    }
}

export function createGrupoTramiteReasignacion(response: BackOfficeResponse<GrupoTramiteReasignacion>):
 Validation<ValidationError, GrupoTramiteReasignacion> {
    return GrupoTramiteReasignacionFactory.grupoTramiteReasignacionValidation(response);
}
