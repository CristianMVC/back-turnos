import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

//import { AgregarCategoriaComponent } from './agregar-categoria/agregar-categoria.component';
//import { AgregarCategoriaService } from './agregar-categoria/services/agregar-categoria.service';
//import { CategoriaResolve } from './agregar-categoria/categoria.resolve';

//import { EliminarCategoriaService } from './eliminar-categoria/services/eliminar-categoria.service';
//import { ModalEliminarCategoriaComponent } from './eliminar-categoria/modal-eliminar-categoria.component';

//export { AgregarCategoriaService, EliminarCategoriaService };

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
//        AgregarCategoriaService,
 //       EliminarCategoriaService,
 //       CategoriaResolve
    ],
    declarations: [
 //       AgregarCategoriaComponent,
 //       ModalEliminarCategoriaComponent
    ],
 //   exports: [ModalEliminarCategoriaComponent]
})
export class AbmCategoriasModule {
    //static abmRoutes: Routes = [{
     //   path: 'agregar', component: AgregarCategoriaComponent
   // }, {
    //    path: 'editar/:idCategoria', component: AgregarCategoriaComponent,
   //     resolve: { categoria: CategoriaResolve }
   // }];
}
