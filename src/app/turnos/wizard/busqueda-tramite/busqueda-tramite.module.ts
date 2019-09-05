import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { SeleccionTurnoModule } from '../../wizard/seleccion-turno/seleccion-turno.module';
import { BusquedaTurnoModule } from '../../busqueda-turno/busqueda-turno.module';

import { TramitesListComponent } from './tramites-list/tramites-list.component';
import { TramiteSearchTypeaheadComponent } from './tramites-search/tramite-search-typeahead.component';
import { BusquedaTramiteComponent } from './busqueda-tramite.component';
import { TramitesResolve } from './tramites-list/tramites.resolve';
import { TramitesService } from './services/tramites.service';

const appRoutes: Routes = [
//  { path: '', component: BusquedaTramiteComponent, resolve: { tramites: TramitesResolve } },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    SharedModule,
    FormsModule,
    SeleccionTurnoModule,
    BusquedaTurnoModule
  ],
  providers: [
    TramitesResolve,
    TramitesService
  ],
  declarations: [
    TramitesListComponent,
    TramiteSearchTypeaheadComponent,
    BusquedaTramiteComponent],
  exports: [RouterModule]
})
export class BusquedaTramiteModule { }
