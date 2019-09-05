import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {EtiquetaComponent} from "./etiqueta.component";
import {EtiquetaResolve} from "./etiqueta.resolve";
import {EtiquetasService} from "./services/etiqueta.service";
import {TablaEtiquetasComponent} from "./tabla-etiquetas/tabla.etiquetas.component";
import {SharedModule} from "../shared/shared.module";


export const etiquetasRoutes: Routes = [{
    path: '',
    component:EtiquetaComponent,
    resolve: { 'etiquetas': EtiquetaResolve }
}];

@NgModule({
    declarations: [
        EtiquetaComponent,
        TablaEtiquetasComponent
    ],
    imports: [
        RouterModule.forChild(etiquetasRoutes),
        CommonModule,
        FormsModule,
        SharedModule
    ],
    providers: [
        EtiquetaResolve,
        EtiquetasService
    ],
    bootstrap: [  ],
    exports: [
        RouterModule
    ]
})
export class EtiquetaModule { }