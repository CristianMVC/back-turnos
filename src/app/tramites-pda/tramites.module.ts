import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { TramitesComponent } from './tramites.component';
import { TablaTramitesComponent } from './tabla-tramites/tabla-tramites.component';
import { TramitesService } from './tabla-tramites/services/tramites.service';
import { TramitesPdaResolve } from './tramites.resolve';
import { AbmTramitePdaModule} from '../tramites-pda/abm/abm-tramites-pda.module'
import { DiasDeshabilitadosTramiteModule } from '../tramites-pda/dias-deshabilitados-tramite/dias-deshabilitados-tramite.module'

export const tramitesRoutes: Routes = [
    { path: 'puntoAtencion/:idPuntoAtencion',
    children: DiasDeshabilitadosTramiteModule.ddRoutes.concat([ 
        { path: '', component: TramitesComponent, resolve: { tramites: TramitesPdaResolve } }
        ]).concat(AbmTramitePdaModule.abmRoutes)
        
    
}
    
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(tramitesRoutes),
        SharedModule,
        AbmTramitePdaModule,
        DiasDeshabilitadosTramiteModule
    ],
    declarations: [
        TramitesComponent,
        TablaTramitesComponent
    ],
    providers: [
        TramitesPdaResolve,
        TramitesService
    ]
})
export class TramitesPdaModule { }
