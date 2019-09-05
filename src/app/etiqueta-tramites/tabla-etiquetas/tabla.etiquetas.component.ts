import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Either } from 'monet';
import { EtiquetasService } from '../services/etiqueta.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    selector: 'app-tabla-etiquetas',
    templateUrl: 'tabla.etiquetas.component.html'
})
export class TablaEtiquetasComponent implements OnInit {
    @Input() etiquetas: EtiquetasPag;


    pageSize: number;
    crear: boolean;
    modificar:any;
    public input: any = {};
    nombre : any;

    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private etiquetasService: EtiquetasService,
    ) { }

    ngOnInit() {
        this.pageSize = this. etiquetasService.getLimit();
        this.input.nombre = "";
        this.input.nueva = "";

    }

    onPageChange(offset: number) {
        this. etiquetasService.getEtiquetas(offset)
            .subscribe((etiquetas: EtiquetasPag) => {
                this.etiquetas = etiquetas;
            });
    }

    refresh(offset: number) {
        this. etiquetasService.getEtiquetas(offset)
            .subscribe((etiquetas: EtiquetasPag) => {
                this.etiquetas = etiquetas;
            });
    }

    hasResults(): boolean {
        return this.etiquetas.size > 0;
    }

    mostrarCrearEtiqueta() {
        if(!this.crear) {
            this.crear = true;
        } else {
            this.crear = false;
        }

    }

     modalEliminar(etiqueta:Etiqueta) {
        this. etiquetasService.eliminarEtiqueta(etiqueta.id).subscribe((response: BackOfficeStatusResponse) => {
            this.alertComponent.success(response.userMessage);
            this. input = {'nombre': ""};
            this.refresh(0);

        }, ((err: ErrorSNT) => {
            this.alertComponent.errors(err);
        }));
        this.refresh(0);
    }


    editar(etiqueta: Etiqueta){
        this.modificar = etiqueta.id;
    }


      modificarEtiqueta(etiqueta:Etiqueta) {
          if(this.input.nombre.length == 0) {
              this.alertComponent.errors(['El campo de la etiqueta no debe estar vacío']);
              return;
          }

          if(this.existeEtiqueta(this.etiquetas, this.input.nombre)) {
              this.alertComponent.errors(['La etiqueta ya existe']);
              return;
          }

          this.etiquetasService.modificarEtiqueta(etiqueta, this.input).subscribe((response: BackOfficeStatusResponse) => {
              this.alertComponent.success(response.userMessage);
              this. input = {'nombre': ""};
              this. modificar = null;
              this.refresh(0);

          }, ((err: ErrorSNT) => {
              this.alertComponent.errors(err);
          }));

      }

    existeEtiqueta(etq: EtiquetasPag, etiqueta: string) {
        let existe = false;

        etq.etiquetas.forEach(function(element) {

            if(etiqueta == element.nombre ) {
                existe = true;
            }

        });
       return existe;
    }



    onSubmit() {
          var etq = {"nombre": ""};

          if(this.input.nombre) {
             etq.nombre = this.input.nombre;
            }

          if(this.input.nueva) {
              etq.nombre = this.input.nueva;
            }

          if(etq.nombre) {
           if(this.existeEtiqueta(this.etiquetas, etq.nombre)) {
               this.alertComponent.errors(['La etiqueta ya existe']);
               return;
           }

            this.etiquetasService.crearEtiqueta(etq).subscribe((response: BackOfficeStatusResponse) => {
                this.alertComponent.success(response.userMessage);
                this. input = {'nombre': ""};
                this.crear = false;
                this.refresh(0);

            }, ((err: ErrorSNT) => {
                this.alertComponent.errors(err);
            }));

        }

    }

}
