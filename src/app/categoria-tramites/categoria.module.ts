import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './categoria.component';
import {CategoriaResolve} from "./categoria.resolve";
import {CategoriasService} from "./services/categoria.service";
import { TablaCategoriasComponent } from './tabla-categorias/tabla.categorias.component';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { SharedModule } from '../shared/shared.module';




export const categoriasRoutes: Routes = [{
    path: '',
    component:CategoriaComponent,
    resolve: { categorias: CategoriaResolve }
}];

@NgModule({
    declarations: [
        CategoriaComponent,
        TablaCategoriasComponent
    ],
    imports: [
        RouterModule.forChild(categoriasRoutes),
        CommonModule,
        FormsModule,
        SharedModule
    ],
    providers: [
        CategoriaResolve,
        CategoriasService
    ],
    bootstrap: [  ],
    exports: [
        RouterModule
    ]
})
export class CategoriaModule { }
