import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CalendarioComponent } from './calendario.component';
import { CalendarioResolve } from './calendario.resolve';
import { CalendarioGuard } from './calendario.guard';
import { CalendarioService } from './services/calendario.service';
import { DiasDeshabilitadosService } from '../dias-deshabilitados/services/dias-deshabilitados.service';

const calendarioRoutes: Routes = [{
    path: '',
    component: CalendarioComponent,
    resolve: { feriados: CalendarioResolve },
    canActivate: [ CalendarioGuard ]
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(calendarioRoutes),
        SharedModule
    ],
    declarations: [
        CalendarioComponent
    ],
    providers: [
        CalendarioResolve,
        CalendarioGuard,
        CalendarioService,
        DiasDeshabilitadosService,
    ],
    exports: [
        RouterModule
    ]
})

export class CalendarioModule { }
