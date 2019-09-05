const createNuevoOrganismo = function () {
    return {
        nombre: 'Organismo Test 1',
        abreviatura: 'OT1'
    }
}

const createOrganismoAEditar = function (id: number): Organismo {
    return {
        id: id,
        nombre: 'Organismo Test 1 Editado',
        abreviatura: 'OT1 Editado'
    }
}

export const TestHelper = {
    createNuevoOrganismo: createNuevoOrganismo,
    createOrganismoAEditar: createOrganismoAEditar
}
