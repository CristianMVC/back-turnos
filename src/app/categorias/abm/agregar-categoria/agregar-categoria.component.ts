import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AgregarCategoriaService } from './services/agregar-categoria.service';
import { AlertContextService } from '../../../shared/alert/alert-context.service';
import { AlertComponent } from '../../../shared/alert/alert.component';

import * as R from 'ramda';

@Component({
    selector: 'app-agregar-categoria',
    templateUrl: 'agregar-categoria.component.html'
})

export class AgregarCategoriaComponent implements OnInit {
    idPuntoAtencion: number;
    editMode: boolean;
    categoria: Categoria;
    tramitesDisponibles: Tramite[];
    tramitesSeleccionados: Tramite[];
    agregarCategoriaForm: FormGroup;

    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    constructor(
        private agregarCategoriaService: AgregarCategoriaService,
        private alertContextService: AlertContextService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.idPuntoAtencion = this.route.snapshot.params['idPuntoAtencion'];
        this.categoria = this.route.snapshot.data['categoria'] || {} as Categoria;
        this.tramitesDisponibles = this.route.snapshot.data['tramitesDisponibles'];
        this.editMode = R.not(R.isEmpty(this.categoria));

        this.agregarCategoriaForm = new FormGroup({
            nombre: new FormControl('', [
                Validators.required
            ]),
            tramites: new FormControl('', [
                Validators.min(1)
            ])
        });

        this.tramitesSeleccionados = (this.editMode) ?
            this.categoria.tramites : [];

    }

    onAddClicked(item: any) {
        if (item) {
            const index = R.findIndex(R.propEq('id', item.id))(this.tramitesDisponibles);
            if (index > -1) {
                this.tramitesDisponibles.splice(index, 1);
                this.tramitesSeleccionados.push(item);
            }
        }
    }

    onRemoveClicked(item: any) {
        if (item) {
            const index = R.findIndex(R.propEq('id', item.id))(this.tramitesSeleccionados);
            if (index > -1) {
                this.tramitesSeleccionados.splice(index, 1);
                this.tramitesDisponibles.push(item);
            }
        }
    }

    private createCategoria(form: FormGroup): NuevaCategoriaForm {
        // mapea lista de tramites a lista de ids
        const listaIds: number[] = this.tramitesSeleccionados
            .map(function(item: any) {
                return item.id;
            });

        return {
            nombre: form.value.nombre,
            id: this.categoria.id || 0,
            tramites: listaIds
        }
    }

    onSubmit() {
        if (this.agregarCategoriaForm.valid) {
            const categoria: NuevaCategoriaForm = this.createCategoria(this.agregarCategoriaForm);

            if (this.editMode) {
                this.agregarCategoriaService.editarCategoria(this.idPuntoAtencion, categoria)
                    .subscribe((response: BackOfficeStatusResponse) => {
                        this.alertContextService.success(response.userMessage);
                        this.salir();
                    }, ((err: ErrorSNT) => {
                        this.alertComponent.errors(err);
                    }));
            } else {
                this.agregarCategoriaService.agregarCategoria(this.idPuntoAtencion, categoria)
                    .subscribe((response: BackOfficeStatusResponse) => {
                        this.categoria.id = response.additional.id;
                        this.alertContextService.success(response.userMessage);
                        this.salir();
                    }, ((err: ErrorSNT) => {
                        this.alertComponent.errors(err);
                }));
            }
        }
    }

    salir() {
        return (this.editMode ?
            this.router.navigate(['../../'], { relativeTo: this.route }) :
            this.router.navigate(['../'], { relativeTo: this.route }));
    }
}
