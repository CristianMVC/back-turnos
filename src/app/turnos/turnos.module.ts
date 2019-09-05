import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WizardContextService } from './wizard/wizard-context.service';
import { BusquedaTramiteModule } from './wizard/busqueda-tramite/busqueda-tramite.module';

@NgModule({
  imports: [
    CommonModule,
    BusquedaTramiteModule
  ],
  providers: [
     WizardContextService
  ]
})
export class TurnosModule { }
