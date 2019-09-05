import { NgModule } from '@angular/core';
import { SessionService } from './shared/services/session.service';
import { HttpModule } from '@angular/http';
import { HttpSNT } from './shared/services/http-snt';
import { LoaderService } from './shared/services/loader.service';
import { EncrypterService } from './shared/services/encrypter.service';
import { ExpirationService } from './shared/expiration/expiration.service';
import { LoginService } from './testing.service';
export { LoginService };

@NgModule({
  providers: [
    HttpSNT,
    SessionService,
    LoaderService,
    EncrypterService,
    ExpirationService,
    LoginService
  ],
  imports: [
    HttpModule
  ]
})
export class TestingModule { }
