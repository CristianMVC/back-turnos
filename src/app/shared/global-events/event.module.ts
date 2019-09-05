import { NgModule, ModuleWithProviders } from '@angular/core';
import { OrganismoUpdateEventService } from './organismo-update-event.service';

@NgModule({})
export class EventModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: EventModule,
            providers: [OrganismoUpdateEventService]
        };
    }
}

export { OrganismoUpdateEventService }


