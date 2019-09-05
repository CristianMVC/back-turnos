import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ConfirmacionTurnoComponent } from './confirmacion-turno.component';
import { RequisitosTramiteService } from './services/requisitos-tramite.service'
import { RequisitosResolve } from '../../shared/resolves/requisitos.resolve'
import { ConfirmacionTurnoGuard } from './services/confirmacion-turno-guard.service';

const appRoutes: Routes = [
    { path: 'confirmacionTurno/:tramiteId', component: ConfirmacionTurnoComponent,
     resolve: { requisitos: RequisitosResolve }, canActivate: [ ConfirmacionTurnoGuard ] }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
        SharedModule
    ],
    declarations: [
        ConfirmacionTurnoComponent,
    ],
    providers: [
        RequisitosResolve,
        RequisitosTramiteService,
        ConfirmacionTurnoGuard
    ],
    exports: [RouterModule]
})
export class ConfirmacionModule { }
