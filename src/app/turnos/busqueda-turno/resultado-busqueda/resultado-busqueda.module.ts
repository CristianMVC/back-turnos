import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ResultadoBusquedaComponent } from './resultado-busqueda.component';
import { BusquedaTurnoContextService } from '../busqueda-turno-context.service';
import { RequisitosResolve } from '../../shared/resolves/requisitos.resolve';

const appRoutes: Routes = [
    { path: 'resultadoBusqueda/:tramiteId', component: ResultadoBusquedaComponent, resolve: { requisitos: RequisitosResolve } }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
        SharedModule
    ],
    declarations: [
        ResultadoBusquedaComponent,
    ],
    providers: [
        BusquedaTurnoContextService,
        RequisitosResolve
    ],
    exports: [RouterModule]
})

export class ResultadoBusquedaModule { }
