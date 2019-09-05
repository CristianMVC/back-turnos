import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { EliminarPuntoAtencionModule } from './eliminar-punto-atencion/eliminar-punto-atencion.module';
import { AgregarPuntoAtencionComponent } from './agregar-punto-atencion/agregar-punto-atencion.component';
import { AgregarPuntoAtencionService } from './agregar-punto-atencion/services/agregar-punto-atencion.service';
import { PuntoAtencionResolve } from './agregar-punto-atencion/punto-atencion.resolve';
import { AreaResolve } from './agregar-punto-atencion/area.resolve';

export { AgregarPuntoAtencionService, PuntoAtencionResolve }

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        EliminarPuntoAtencionModule
    ],
    providers: [
        AgregarPuntoAtencionService,
        PuntoAtencionResolve,
        AreaResolve,
    ],
    declarations: [
        AgregarPuntoAtencionComponent,
    ],
    exports: [ EliminarPuntoAtencionModule ]
})
export class AbmPuntosAtencionModule {
    static abmRoutes: Routes = [{
        path: 'agregar',
        component: AgregarPuntoAtencionComponent,
        resolve: {
            area: AreaResolve
    }}, {
        path: 'editar/:idPuntoAtencion',
        component: AgregarPuntoAtencionComponent,
        resolve: {
            puntoAtencion: PuntoAtencionResolve,
            area: AreaResolve
    }}];
}
