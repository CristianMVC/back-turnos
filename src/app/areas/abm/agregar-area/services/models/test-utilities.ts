const createNuevoOrganismo = function () {
    return {
        nombre: 'Organismo Test 1',
        abreviatura: 'OT1'
    }
}

const createOrganismoAEditar = function (id: number) {
    return {
        id: id,
        nombre: 'Organismo Test 1 Editado',
        abreviatura: 'OT1 Editado'
    }
}

const createNuevoArea = function () {
    return {
        nombre: 'Area Test 1',
        abreviatura: 'OT1'
    }
}

const createAreaAEditar = function (id: number) {
    return {
        id: id,
        nombre: 'Area Test 1 Editado',
        abreviatura: 'OT1 Editado'
    }
}


export const TestHelper = {
    createNuevoOrganismo: createNuevoOrganismo,
    createOrganismoAEditar: createOrganismoAEditar,
    createNuevoArea: createNuevoArea,
    createAreaAEditar: createAreaAEditar
}
