import { NgModule, ModuleWithProviders } from '@angular/core';
import { EncrypterService } from './encrypter.service';

@NgModule({})
export class EncrypterModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: EncrypterModule,
            providers: [EncrypterService]
        };
    }
}

export { EncrypterService }
