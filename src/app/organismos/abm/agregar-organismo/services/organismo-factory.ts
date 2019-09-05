export class OrganismoFactory {

    static create(json: any): Organismo {
        const result = json.result;
        return {
            id: result.id,
            nombre: result.nombre,
            abreviatura: result.abreviatura
        }
    }
}
