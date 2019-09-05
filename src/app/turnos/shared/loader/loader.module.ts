import { NgModule, ModuleWithProviders } from '@angular/core';
import { LoaderService } from './loader.service';

@NgModule({})
export class LoaderModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: LoaderModule,
            providers: [LoaderService]
        };
    }
}

export { LoaderService }


