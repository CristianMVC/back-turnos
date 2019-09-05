import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { AgregarTramiteComponent } from './agregar-tramite/agregar-tramite.component';
import { ModalCrearCampoComponent } from './agregar-tramite/crear-campo/modal-crear-campo.component';
import { AgregarTramiteService } from './agregar-tramite/services/agregar-tramite.service';
import { TramiteResolve } from './agregar-tramite/tramite.resolve';
import { CamposDisponiblesResolve } from './agregar-tramite/campos-disponibles.resolve';
import { DynamicComponent } from './agregar-tramite/crear-campo/campo-option/campo-option.component';
import { AddDynamicComponentService } from './agregar-tramite/crear-campo/campo-option/services/add-dynamic-component.service';
import { ModalEliminarTramiteComponent } from './eliminar-tramite/modal-eliminar-tramite.component';
import { EliminarTramiteService } from './eliminar-tramite/services/eliminar-tramite.service';
import {EtiquetasService} from "../../etiqueta-tramites/services/etiqueta.service";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        AgregarTramiteService,
        TramiteResolve,
        CamposDisponiblesResolve,
        AddDynamicComponentService,
        EliminarTramiteService,
        EtiquetasService
    ],
    declarations: [
        AgregarTramiteComponent,
        ModalCrearCampoComponent,
        DynamicComponent,
        ModalEliminarTramiteComponent
    ],
    exports: [
        ModalCrearCampoComponent, ModalEliminarTramiteComponent
    ],
    entryComponents: [ DynamicComponent ],
})
export class AbmTramiteModule {
    static abmRoutes: Routes = [{
        path: 'agregar',
        component: AgregarTramiteComponent,
        resolve: {
            camposDisponibles: CamposDisponiblesResolve
        }
    }, {
        path: 'editar/:idTramite',
        component: AgregarTramiteComponent,
        resolve: {
            tramite: TramiteResolve,
            camposDisponibles: CamposDisponiblesResolve
        }
    }];
}

