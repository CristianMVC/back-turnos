import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { RangosComponent } from './rangos.component';
import { TablaRangosComponent } from './tabla-rangos/tabla-rangos.component';
import { RangosService } from './tabla-rangos/services/rangos.service';
import { RangosResolve } from './rangos.resolve';
import { AbmRangosModule } from './abm/abm-rangos.module';

export const rangosRoutes: Routes = [{
    path: 'puntoAtencion/:idPuntoAtencion',
    children: AbmRangosModule.abmRoutes.concat([
        { path: '',
        component: RangosComponent,
        resolve: { rangos: RangosResolve } }
    ])
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(rangosRoutes),
        SharedModule,
        AbmRangosModule
    ],
    declarations: [
        RangosComponent,
        TablaRangosComponent
    ],
    providers: [
        RangosResolve,
        RangosService
    ],
    exports: [
        RouterModule
    ]
})
export class RangosModule { }
