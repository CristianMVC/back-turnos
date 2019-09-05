export class AreaFactory {

    static create(json: any): Area {
        const result = json.result;
        return {
            id: result.id,
            nombre: result.nombre,
            abreviatura: result.abreviatura
        }
    }
}
