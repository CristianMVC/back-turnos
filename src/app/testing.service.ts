import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http, Response } from '@angular/http';
import { EncrypterService } from './shared/services/encrypter.service';
import { AES, MD5, enc } from 'crypto-js';

@Injectable()
export class LoginService {

  constructor(
      private http: Http,
      private encrypterService: EncrypterService
  ) { }

  login(user: string, pass: string) {
      return this.http.post(environment.endpoint.UsuariosAPI + 'auth/login', { password: pass, username: user })
      .map((response: Response) => {
          return this.getAuthData(response.json());
      });
  }

  logout() {
      return this.http.post(environment.endpoint.UsuariosAPI + 'auth/logout', {}, 'usuarios')
      .map((response: Response) => {
          return this.getAuthData(response.json());
      });
  }

  private getAuthData(usuario: any) {
    const sessionData: SessionEncryptedData = this.encryptSessionData(usuario, localStorage.getItem('systemData') || '');
    localStorage.setItem('token', this.encrypterService.encryptToken(usuario.token, sessionData.dataKey));
    this.saveEncryptedSesssionData(sessionData);
    return encodeURIComponent(JSON.stringify(sessionData));
  }

  private saveEncryptedSesssionData(sessionData: SessionEncryptedData) {
    localStorage.setItem('data', sessionData.data);
    localStorage.setItem('systemData', sessionData.dataKey);
  }

  private encryptSessionData(data: any, cipherdatakey: string | null): SessionEncryptedData {
    const dataKey = cipherdatakey ? this.getDataKey(cipherdatakey) : Date.now().toString(36); // tslint:disable-line:no-magic-numbers
    return {
      data: AES.encrypt(JSON.stringify(data), dataKey).toString(),
      dataKey: AES.encrypt(JSON.stringify(dataKey), this.getBaseKey()).toString()
    }
  }

  private getDataKey(cipherdatakey: string) {
    const bytes = AES.decrypt(cipherdatakey, this.getBaseKey());
    return JSON.parse(bytes.toString(enc.Utf8));
  }

  private getBaseKey(): string {
    const x = 39856 * 7 // tslint:disable-line:no-magic-numbers
    return MD5(x.toString()).toString();
  }
}
