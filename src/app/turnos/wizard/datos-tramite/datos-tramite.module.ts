import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { ConfirmacionModule } from '../../wizard/confirmacion-turno/confirmacion-turno.module';

import { DatosTramiteComponent } from './datos-tramite.component';
import { DatosTramiteResolve } from './datos-tramite.resolve';
import { DynamicTramiteFormComponent } from './dynamic-tramite-form/dynamic-tramite-form.component';
import { TurnoExpirationComponent } from './turno-expiration/turno-expiration.component';
import { FormularioTramiteService } from './services/formulario-tramite.service';
import { ConfirmarTurnoService } from './services/confirmar-turno.service';
import { DatosTurnoGuard } from './services/datos-turno-guard.service';
import { ValidateCuil } from './validate-cuil';
import { ValidateAlfanumerico } from './validate-alfanumerico';


const appRoutes: Routes = [
    { path: 'datosTramite/:tramiteId', component: DatosTramiteComponent, resolve: { formulario: DatosTramiteResolve },
        canActivate: [ DatosTurnoGuard ] },
    { path: 'datosTramite/:tramiteId/expiracion', component: TurnoExpirationComponent, canActivate: [ DatosTurnoGuard ] }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        ConfirmacionModule
    ],
    providers: [
        DatosTramiteResolve,
        ConfirmarTurnoService,
        FormularioTramiteService,
        DatosTurnoGuard,
        ValidateCuil,
        ValidateAlfanumerico
    ],
    declarations: [
        DatosTramiteComponent,
        DynamicTramiteFormComponent,
        TurnoExpirationComponent
    ],
    exports: [RouterModule]
})
export class DatosTramiteModule { }
