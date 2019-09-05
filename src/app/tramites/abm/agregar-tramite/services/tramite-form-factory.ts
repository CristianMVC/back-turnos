export class TramiteFormFactory {

    static create(result: any, campos: any[], areas: number[], org: boolean): NuevoTramiteForm {
        const radix = 10;
        return {
            area: areas,
            campos: campos,
            duracion: result.duracion,
            idArgentinaGobAr: parseInt(result.idArgentinaGobAr, radix),
            nombre: result.nombre,
            descripcion: result.descripcion,
            requisitosAsString: result.requisitosAsString,
            requisitos: (result.requisitosAsString) ? result.requisitosAsString.split('\n') : null,
            visibilidad: result.visibilidad,
            excepcional: result.excepcional,
            multiple: result.multiple,
            multiple_max:result.multiple_max,
            multiple_horizonte:result.multiple_horizonte,
            id: result.id,
            org: org,
            miArgentina:  result.miArgentina
        }
    }

    static createFromResponse(result: any): NuevoTramiteForm {
        return {
            area: result.area,
            campos: result.campos,
            duracion: result.duracion,
            idArgentinaGobAr: result.argentinaGobArId,
            nombre: result.nombre,
            descripcion: result.descripcion,
            requisitosAsString: result.requisitos.join('\n'),
            requisitos: result.requisitos,
            visibilidad: result.visibilidad,
            excepcional: result.excepcional,
            multiple: result.multiple,
            multiple_max:result.multiple_max,
            multiple_horizonte:result.multiple_horizonte,
            id: result.id,
            org: result.org,
            miArgentina: result.miArgentina
        }
    }
}

