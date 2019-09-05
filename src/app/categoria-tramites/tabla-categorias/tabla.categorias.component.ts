import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Either } from 'monet';
import { CategoriasService } from '../services/categoria.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    selector: 'app-tabla-categoriasTramite',
    templateUrl: 'tabla.categorias.component.html'
})
export class TablaCategoriasComponent implements OnInit {
    @Input() categoriasPaginables: CategoriasPaginables;


    pageSize: number;
    crear: boolean;
    modificar:any;
    public input: any = {};
    categoria : any;

    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private categoriasService: CategoriasService,
   //     private agregarCategoriaService: AgregarCategoriaService
    ) { }

    ngOnInit() {
        this.pageSize = this.categoriasService.getLimit();
        this.input.categoria = "";
        this.input.nueva = "";

    }

    onPageChange(offset: number) {
        this.categoriasService.getCategorias(offset)
            .subscribe((categorias: CategoriasPaginables) => {
                this.categoriasPaginables = categorias;
            });
    }

    refresh(offset: number) {
        this.categoriasService.getCategorias(offset)
            .subscribe((categorias: CategoriasPaginables) => {
                this.categoriasPaginables = categorias;
            });
    }

    hasResults(): boolean {
        return this.categoriasPaginables.size > 0;
    }

    mostrarCrearCategoria() {
        if(!this.crear) {
            this.crear = true;
        } else {
            this.crear = false;
        }

    }

    modalEliminar(categoria: Categoria) {
        this.categoriasService.eliminarCategoria(categoria.id).subscribe((response: BackOfficeStatusResponse) => {
            this.alertComponent.success(response.userMessage);
            this. input = {'categoria': ""};
            this.refresh(0);

        }, ((err: ErrorSNT) => {
            this.alertComponent.errors(err);
        }));
        this.refresh(0);
    }


    editar(categoria: Categoria){
        this.modificar = categoria.id;
    }


    modificarCategoria(categoria: Categoria) {
        if(this.input.categoria.length == 0) {
          this.alertComponent.errors(['El campo de la categoria no debe estar vacío']);
          return;
        }
        if(this.existeCategoria(this.categoriasPaginables, this.input.categoria)) {
            this.alertComponent.errors(['La ategoría ya existe']);
            return;
        }

        this.categoriasService.modificarCategoria(categoria, this.input).subscribe((response: BackOfficeStatusResponse) => {
            this.alertComponent.success(response.userMessage);
            this. input = {'categoria': ""};
            this. modificar = null;
            this.refresh(0);

        }, ((err: ErrorSNT) => { console.log( this.alertComponent.errors(err));
            this.alertComponent.errors(err);
        }));

    }

    existeCategoria(catPg: CategoriasPaginables, categoria: string) {
     let existe = false;
        catPg.categorias.forEach(function(element) {
            if(categoria == element.nombre ) {
              existe = true;
            }
        });
        return existe;
    }



    onSubmit() {
      var cat =  {'categoria': ""};

        if (this.input.categoria) {
             cat.categoria = this.input.categoria;
        }

        if (this.input.nueva) {
            cat.categoria = this.input.nueva;
        }

        if(cat)
        {
            if(this.existeCategoria(this.categoriasPaginables, this.input.categoria)) {
                this.alertComponent.errors(['La categoría ya existe']);
                return;
            }

            this.categoriasService.crearCategoria(cat).subscribe((response: BackOfficeStatusResponse) => {
               this.alertComponent.success(response.userMessage);
               this. input = {'categoria': ""};
               this.crear = false;
               this.refresh(0);

           }, ((err: ErrorSNT) => {
               this.alertComponent.errors(err);
           }));

        }

    }

}
