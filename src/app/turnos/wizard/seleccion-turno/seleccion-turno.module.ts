import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { DatosTramiteModule } from '../../wizard/datos-tramite/datos-tramite.module';

import { SeleccionTurnoComponent } from './seleccion-turno.component';
import { ProvinciasResolve } from './provincias.resolve';
import { DiasDisponiblesTurnoComponent } from './dias-disponibles-turno/dias-disponibles-turno.component';
import { DiasDisponiblesTurnoService } from './dias-disponibles-turno/dias-disponibles-turno.service';
import { PuntosAtencionMapComponent } from './puntos-atencion/puntos-atencion.component';
import { HorariosDisponiblesTurnoComponent } from './horarios-disponibles-turno/horarios-disponibles-turno.component'; // tslint:disable-line:max-line-length
import { HorizonteResolve } from './dias-disponibles-turno/horizonte.resolve';
import { HorizonteTramiteService } from './services/horizonte-tramite.service';
import { PuntoAtencionService } from './services/punto-atencion.service';
import { ReservaTurnoService } from './services/reserva-turno.service';
import { HorariosDisponiblesService } from './horarios-disponibles-turno/horarios-disponibles.service';
import { ProvinciaLocalidadService } from './services/provincia-localidad.service';
import { SeleccionTurnoGuard } from './services/seleccion-turno-guard.service';
import { TramiteResolve } from './tramite.resolve';
import { TramiteService } from './services/tramite.service';
import { ErrorModule } from '../error/error.module';

const appRoutes: Routes = [
    {
        path: 'seleccionTurno/:tramiteId', component: SeleccionTurnoComponent,
        resolve: { provincias: ProvinciasResolve, horizonte: HorizonteResolve, tramite: TramiteResolve },
    }, // tslint:disable-line:max-line-length
    {
        path: 'public/seleccionTurno/:tramiteId', pathMatch: 'full', redirectTo: 'seleccionTurno/:tramiteId'
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
        FormsModule,
        SharedModule,
        DatosTramiteModule,
        ErrorModule
    ],
    providers: [
        ProvinciasResolve,
        HorizonteResolve,
        HorizonteTramiteService,
        DiasDisponiblesTurnoService,
        PuntoAtencionService,
        ReservaTurnoService,
        HorariosDisponiblesService,
        ProvinciaLocalidadService,
        SeleccionTurnoGuard,
        TramiteResolve,
        TramiteService
    ],
    declarations: [
        SeleccionTurnoComponent,
        DiasDisponiblesTurnoComponent,
        PuntosAtencionMapComponent,
        HorariosDisponiblesTurnoComponent
    ],
    exports: [RouterModule, SeleccionTurnoComponent]
})
export class SeleccionTurnoModule { }
