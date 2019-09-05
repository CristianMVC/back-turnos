import { Maybe, Validation } from 'monet';
import { ValidationError, PropertyObject, ValidationUtils } from '../../../../shared/validations/validations';

export class ReasignacionInfoFactory {

    static reasignacionInfoValidation(response: BackOfficeResponse<ReasignacionInfo>): Validation<ValidationError, ReasignacionInfo> {
        return Maybe.fromNull(response).toValidation(ValidationError.of('response', 'response can not be null'))
            .flatMap((r: PropertyObject): Validation<ValidationError, ReasignacionInfo> => {
                const expectedKeys = ['result'];
                return ValidationUtils.validateObject(expectedKeys, r, (element: PropertyObject) => {
                    return <ReasignacionInfo>element.result;
                })
            })
            .flatMap((r: ReasignacionInfo): Validation<ValidationError, ReasignacionInfo> => {
                const expectedKeys = ['total_turnos', 'grupo_tramites'];
                return ValidationUtils.validateObject(expectedKeys, r, this.createReasignacionInfo);
            })
    }

    private static createReasignacionInfo(element: any): ReasignacionInfo {
        const gruposTramites = element.grupo_tramites.map((grupoTramite: any) => {
            return { id: grupoTramite.id, nombre: grupoTramite.nombre, totalTurnos: grupoTramite.total_turnos }
        })
        return {
            totalTurnos: element.total_turnos,
            grupoTramites: gruposTramites
        }
    }

}

export function create(response: BackOfficeResponse<ReasignacionInfo>): Validation<ValidationError, ReasignacionInfo> {
    return ReasignacionInfoFactory.reasignacionInfoValidation(response);
}
