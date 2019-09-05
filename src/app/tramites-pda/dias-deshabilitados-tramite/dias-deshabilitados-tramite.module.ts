import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DiasDeshabilitadosTramiteComponent } from '../../tramites-pda/dias-deshabilitados-tramite/dias-deshabilitados-tramite.component';
import { DiasDeshabilitadosResolve } from './dias-deshabilitados-tramite.resolve';
import { DiasDeshabilitadosTramiteService } from './services/dias-deshabilitados-tramite.service';
import { CalendarioService } from '../../calendario/services/calendario.service';
import { ReasignarTurnosComponent } from './reasignar-turnos/reasignar-turnos.component';
import { ModalReasignarTurnosTramiteComponent } from './reasignar-turnos/modal-reasignar-turnos.component';
import { ReasignarTurnoService } from './reasignar-turnos/services/reasignar-turnos.service';
import { DiasDeshabilitadosService } from 'app/dias-deshabilitados/services/dias-deshabilitados.service';
import { TramitePdaResolve } from '../abm/editar-tramite-pda/tramite-pda.resolve';
 
@NgModule({ 
    imports: [ 
        CommonModule,
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [
        DiasDeshabilitadosTramiteComponent,
        ModalReasignarTurnosTramiteComponent,
        ReasignarTurnosComponent
    ],
    providers: [
        DiasDeshabilitadosResolve,
        DiasDeshabilitadosTramiteService,
        CalendarioService,
        ReasignarTurnoService,
        DiasDeshabilitadosService
    ],
    exports: [
        RouterModule,
        ModalReasignarTurnosTramiteComponent
    ]
})

export class DiasDeshabilitadosTramiteModule {
    static ddRoutes: Routes = [ {
        path: 'deshabilitar/:idTramite', component: DiasDeshabilitadosTramiteComponent,
        resolve: { diasDeshabilitados: DiasDeshabilitadosResolve, tramitepda: TramitePdaResolve }
    }];
 }
