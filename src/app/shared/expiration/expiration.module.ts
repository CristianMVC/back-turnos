import { NgModule, ModuleWithProviders } from '@angular/core';
import { ExpirationService } from './expiration.service';

@NgModule({})
export class ExpirationModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ExpirationModule,
            providers: [ExpirationService]
        };
    }
}

export { ExpirationService }
