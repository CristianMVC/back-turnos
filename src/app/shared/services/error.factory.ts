export class ErrorFactory {

    static obtenerError(response: BackOfficeStatusResponse): ErrorSNT {
        const forbidden = 403;
        if (response.code === forbidden) {
            return [response.userMessage]
        } else {
            return response.userMessage.errors;
        }
    }
}
