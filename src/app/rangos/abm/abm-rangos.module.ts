import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { AgregarRangoComponent } from './agregar-rango/agregar-rango.component';
import { AgregarRangoService } from './agregar-rango/services/agregar-rango.service';
import { RangoResolve } from './agregar-rango/rango.resolve';
import { RangoHorarioResolve } from './agregar-rango/rango-horario.resolve';
import { EliminarRangoService } from './eliminar-rango/services/eliminar-rango.service';
import { ModalEliminarRangoComponent } from './eliminar-rango/modal-eliminar-rango.component';
import { ModalModificarRangoComponent } from './agregar-rango/modal-modificar-rango.component';

export { AgregarRangoService, EliminarRangoService };

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        AgregarRangoService,
        EliminarRangoService,
        RangoResolve,
        RangoHorarioResolve
    ],
    declarations: [
        AgregarRangoComponent,
        ModalEliminarRangoComponent,
        ModalModificarRangoComponent
    ],
    exports: [
        ModalEliminarRangoComponent,
        ModalModificarRangoComponent
    ]
})
export class AbmRangosModule {
    static abmRoutes: Routes = [{
        path: 'agregar', component: AgregarRangoComponent, resolve: { rangoHorario: RangoHorarioResolve }
    }, {
        path: 'editar/:idRango', component: AgregarRangoComponent,
        resolve: { rango: RangoResolve, rangoHorario: RangoHorarioResolve }
    }];
 }
