export class PuntoAtencionFactory {

    static create(json: any): PuntoAtencion {
        const result = json.result;
        return {
            id: result.id,
            nombre: result.nombre,
            area: result.area,
            provincia: result.provincia,
            localidad: result.localidad,
            direccion: result.direccion,
            tramites: result.tramites,
            estado: result.estado
        };
    }
}
