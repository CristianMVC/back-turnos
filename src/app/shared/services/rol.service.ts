import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import * as R from 'ramda';

const configuracionLinks: { [key: string]: Rol[] } = {
    calendario:  ['ROL_ADMIN'],
    usuarios: ['ROL_ADMIN', 'ROL_ORGANISMO', 'ROL_AREA', 'ROL_PUNTOATENCION'],
    organismos: ['ROL_ADMIN'],
    areas: ['ROL_ADMIN', 'ROL_ORGANISMO'],
    no_aux: ['ROL_ADMIN', 'ROL_ORGANISMO', 'ROL_AREA', 'ROL_PUNTOATENCION'],
    aux: ['ROL_ORGANISMO_AUX'],
    tramites: ['ROL_ADMIN', 'ROL_ORGANISMO', 'ROL_AREA'],
    pdas: ['ROL_ADMIN', 'ROL_ORGANISMO', 'ROL_AREA'],
    adminPda: ['ROL_ADMIN', 'ROL_ORGANISMO', 'ROL_AREA', 'ROL_PUNTOATENCION'],
    myPda: ['ROL_PUNTOATENCION'],
    tod: ['ROL_PUNTOATENCION', 'ROL_AGENTE']
}

// nav externa
const rolDestino: { [key: string]: Rol[] } = {
    'administrar': ['ROL_ADMIN', 'ROL_ORGANISMO', 'ROL_AREA', 'ROL_PUNTOATENCION','ROL_ORGANISMO_AUX'],
    'calendario': ['ROL_ADMIN']
}

const mapRol: { [key: number]: string } = {
    1: 'Administrador',
    2: 'Responsable de Organismo',
    3: 'Responsable de Área',
    4: 'Responsable de Punto de atención',
    5: 'Agente',
    6: 'Organismo Aux'
}

const mapIdRol: { [key: string]: number } = {
   'ROL_ADMIN': 1,
   'ROL_ORGANISMO': 2,
   'ROL_AREA': 3,
   'ROL_PUNTOATENCION': 4,
   'ROL_AGENTE': 5,
   'ROL_ORGANISMO_AUX': 6

}

const mapUsuarioFuncion: { [key: number]: (u: Usuario) => string } = {
    1: () => '',
    2: (u) => u.organismo.nombre,
    3: (u) => u.area.nombre,
    4: (u) => u.puntoAtencion.nombre
}

@Injectable()
export class RolService {

    constructor(private sessionService: SessionService) { }

    isAdmin(rol: Rol) {
        return rol === 'ROL_ADMIN';
    }

    isResponsableOrganismo(rol: Rol) {
        return rol === 'ROL_ORGANISMO' ;
    }

    isOrganismoAux(rol: Rol) {
        return  rol === 'ROL_ORGANISMO_AUX';
    }
    isResponsableArea(rol: Rol) {
        return rol === 'ROL_AREA';
    }

    isResponsablePDA(rol: Rol) {
        return rol === 'ROL_PUNTOATENCION';
    }

    isAgente(rol: Rol) {
        return rol === 'ROL_AGENTE';
    }

    getRol() {
        return this.sessionService.getRol();
    }

    getRolOption(id: number): SelectorOption {
        return {
            id: id,
            nombre: mapRol[id]
        }
    }

    getRolString(numeroRol: number) {
        return mapRol[numeroRol];
    }

    getRolIdAdmin() {
        return mapIdRol['ROL_ADMIN'];
    }

    getRolIdRespOrganismo() {
        return mapIdRol['ROL_ORGANISMO'];
    }

    getRolIdRespArea() {
        return mapIdRol['ROL_AREA'];
    }

    getRolIdRespPuntoAtencion() {
        return mapIdRol['ROL_PUNTOATENCION'];
    }

    seDebeMostrarLink(nombreLink: string) {
        return configuracionLinks[nombreLink].some(x => x === this.sessionService.getRol());
    }

    getFuncionUsuario(usuario: Usuario) {
        return mapUsuarioFuncion[usuario.rol](usuario);
    }

    isAdminLogged() {
        const rol: Rol | null = this.getRol();
        return rol ? this.isAdmin(rol) : false;
    }

    isResponsableOrganismoLogged() {
        const rol: Rol | null = this.getRol();
        return rol ? this.isResponsableOrganismo(rol) : false;
    }

    isResonsableAreaLogged() {
        const rol: Rol | null = this.getRol();
        return rol ? this.isResponsableArea(rol) : false;
    }

    isRolPermitidoParaBackOffice() {
        const rolActual = this.getRol();
        return rolActual ? mapIdRol.hasOwnProperty(rolActual) : false;
    }

    isResponsablePdaLogged() {
        const rol: Rol | null = this.getRol();
        return rol ? this.isResponsablePDA(rol) : false;
    }

    isOrganismoAuxLogged() {
        const rol: Rol | null = this.getRol();
        return rol ? this.isOrganismoAux(rol) : false;
    }
    canNavigate(destino: string) {
        const index = R.findIndex(R.equals(destino))(R.keys(rolDestino));
        return (index > -1);
    }

    canNavigateRol(destino: string) {
        return rolDestino[destino].some(x => x === this.getRol());
    }

}
