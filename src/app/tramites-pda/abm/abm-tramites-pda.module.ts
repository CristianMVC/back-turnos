import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { EditarTramitePdaComponent } from './editar-tramite-pda/editar-tramite-pda.component';
import { EditarTramitePdaService } from './editar-tramite-pda/services/editar-tramite-pda.service';
import { TramitePdaResolve } from './editar-tramite-pda/tramite-pda.resolve';

export { EditarTramitePdaComponent};

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        EditarTramitePdaService,
        TramitePdaResolve
    ],
    declarations: [
        EditarTramitePdaComponent,
    ]
})
export class AbmTramitePdaModule {
    static abmRoutes: Routes = [ {
        path: 'editar/:idTramite', component: EditarTramitePdaComponent,
        resolve: { tramitepda: TramitePdaResolve }
    }];
 }
