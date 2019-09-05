import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ResultadoBusquedaModule } from './resultado-busqueda/resultado-busqueda.module';
import { BusquedaTurnoComponent } from './busqueda-turno.component';
import { BusquedaTurnoService } from './services/busqueda-turno.service';
import { RedirectBusquedaTurnoComponent } from './redirect-busqueda-turno.component';
import { BusquedaTurnoResolve } from './busqueda-turno.resolve';


const appRoutes: Routes = [
    { path: 'busquedaTurno', component: BusquedaTurnoComponent },
    { path: 'busquedaTurno/codigo/:codigo/cuil/:cuil',
    component: RedirectBusquedaTurnoComponent, resolve : { datosTurno: BusquedaTurnoResolve }}

];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ResultadoBusquedaModule
    ],
    declarations: [
        BusquedaTurnoComponent,
        RedirectBusquedaTurnoComponent
    ],
    providers: [BusquedaTurnoService, BusquedaTurnoResolve],
    exports: [RouterModule]
})

export class BusquedaTurnoModule { }
