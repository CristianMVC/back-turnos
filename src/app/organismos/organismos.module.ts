import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { OrganismosService } from './tabla-organismos/services/organismos.service';
import { TablaOrganismosComponent } from './tabla-organismos/tabla-organismos.component';
import { OrganismosResolve } from './organismos.resolve';
import { OrganismosComponent } from './organismos.component';
import { AbmOrganismoModule } from './abm/abm-organismo.module';
import { AreasModule } from '../areas/areas.module';

export { OrganismosService };

export const getAreaModule = () => AreasModule;

export const appRoutes: Routes = [{
    path: '',
    children: AbmOrganismoModule.abmRoutes.concat([
        { path: '', component: OrganismosComponent, resolve: { organismos: OrganismosResolve } },
        { path: ':idOrganismo', loadChildren: getAreaModule }
    ])
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
        SharedModule,
        AbmOrganismoModule,
    ],
    declarations: [
        OrganismosComponent,
        TablaOrganismosComponent
    ],
    providers: [
        OrganismosResolve,
        OrganismosService,
    ],
    exports: [
        RouterModule
    ]
})

export class OrganismosModule { }
