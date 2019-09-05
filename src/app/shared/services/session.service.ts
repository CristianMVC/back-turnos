import { Injectable } from '@angular/core';
import { EncrypterService } from './encrypter.service';
import * as R from 'ramda';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class SessionService {

    private subject = new Subject<void>();
    constructor(private encrypterService: EncrypterService) { }

    emit() {
        this.subject.next();
    }

    getMessage(): Subject<void> {
        return this.subject;
    }

    saveData(data: any) {
        const dataParsed = JSON.parse(data);
        this.saveEncryptedSesssionData(dataParsed);
        this.saveToken();
    }

    getLoggedInData() {
        const sessionData: SessionEncryptedData = this.getEncryptedSesssionData();
        return encodeURIComponent(JSON.stringify(sessionData));
    }

    getUsername(): string | null {
        const decryptedData = this.getDecryptedData();
        return decryptedData.username;
    }

    getNombreYApellido(): string | null {
        const decryptedData = this.getDecryptedData();
        return decryptedData.nombre + ' ' + decryptedData.apellido;
    }

    getRol(): Rol | null {
        const decryptedData = this.getDecryptedData();
        return decryptedData.rol;
    }

    getToken(): string | null {
        const token = localStorage.getItem('token') || '';
        return this.encrypterService.decryptData(token, this.getDataKey());
    }

    getOrganismoId(): number | null {
        const decryptedData = this.getDecryptedData();
        return decryptedData.organismo;
    }

    getAreaId(): number | null {
        const decryptedData = this.getDecryptedData();
        return decryptedData.area;
    }

    getPuntoAtencionId(): number | null {
        const decryptedData = this.getDecryptedData();
        return decryptedData.puntoAtencion.id;
    }

    isUserInSession(): boolean {
        return R.not(R.isNil(this.getToken()));
    }

    clear() {
        return localStorage.clear();
    }

    private getDataKey() {
        return localStorage.getItem('systemData') || '';
    }

    private saveEncryptedSesssionData(sessionData: SessionEncryptedData) {
        localStorage.setItem('data', sessionData.data);
        localStorage.setItem('systemData', sessionData.dataKey);
    }

    private getEncryptedSesssionData(): SessionEncryptedData {
        const appData = localStorage.getItem('data') || '';
        return {
            data: appData,
            dataKey: this.getDataKey()
        }
    }

    private saveToken() {
        const decryptedData = this.getDecryptedData();
        localStorage.setItem('token', this.encrypterService.encryptToken(decryptedData.token, this.getDataKey()).toString());
    }

    private getDecryptedData() {
        const data = localStorage.getItem('data') || '';
        return this.encrypterService.decryptData(data, this.getDataKey());
    }

    cleanSession() {
        localStorage.clear();
    }

}
