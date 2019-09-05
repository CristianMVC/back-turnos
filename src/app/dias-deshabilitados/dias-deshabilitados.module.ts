import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DiasDeshabilitadosComponent } from './dias-deshabilitados.component';
import { DiasDeshabilitadosResolve } from './dias-deshabilitados.resolve';
import { DiasDeshabilitadosService } from './services/dias-deshabilitados.service';
import { DiasDeshabilitadosTramiteService } from '../tramites-pda/dias-deshabilitados-tramite/services/dias-deshabilitados-tramite.service';
import { CalendarioService } from '../calendario/services/calendario.service';
import { ReasignarTurnosComponent } from './reasignar-turnos/reasignar-turnos.component';
import { ModalReasignarTurnosComponent } from './reasignar-turnos/modal-reasignar-turnos.component';
import { ReasignarTurnoService } from './reasignar-turnos/services/reasignar-turnos.service';

export const diasDeshabilitadosRoutes: Routes = [{
    path: 'puntoAtencion/:idPuntoAtencion',
    children: [{
        path: '',
        component: DiasDeshabilitadosComponent,
        resolve: { diasDeshabilitados: DiasDeshabilitadosResolve }
    }]
}];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(diasDeshabilitadosRoutes),
        ReactiveFormsModule
    ],
    declarations: [
        DiasDeshabilitadosComponent,
        ModalReasignarTurnosComponent,
        ReasignarTurnosComponent
    ],
    providers: [
        DiasDeshabilitadosResolve,
        DiasDeshabilitadosService,
        DiasDeshabilitadosTramiteService,
        CalendarioService,
        ReasignarTurnoService
    ],
    exports: [
        RouterModule,
        ModalReasignarTurnosComponent
    ]
})

export class DiasDeshabilitadosModule { }
