import { Injectable } from '@angular/core';
import { AES, MD5, enc } from 'crypto-js';
import * as R from 'ramda';

@Injectable()
export class EncrypterService {

  encryptToken(data: any, cipherdatakey: string): string {
    return this.encrypt(data, this.decryptDataKey(cipherdatakey));
  }

  decryptData(data: any, ciphertext: string) {
    const dataKey = this.decryptDataKey(ciphertext)
    if (dataKey) {
      const bytes = AES.decrypt(data, dataKey);
      const bytesToString = bytes.toString(enc.Utf8);
      return JSON.parse(R.isEmpty(bytesToString) ? 'null' : bytesToString);
    } else {
      return JSON.parse('null');
    }
  }

  private decryptDataKey(cipherdatakey: string) {
    const bytes = AES.decrypt(cipherdatakey, this.getBaseKey());
    const bytesToString = bytes.toString(enc.Utf8);
    return JSON.parse(R.isEmpty(bytesToString) ? 'null' : bytesToString);
  }

  private getBaseKey(): string {
    const x = 39856 * 7 // tslint:disable-line:no-magic-numbers
    return MD5(x.toString()).toString();
  }

  private encrypt(data: any, dataKey: string): string {
    return AES.encrypt(JSON.stringify(data), dataKey).toString();
  }
}
