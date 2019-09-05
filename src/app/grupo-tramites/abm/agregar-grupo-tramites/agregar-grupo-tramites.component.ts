import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AgregarGrupoTramitesService } from './services/agregar-grupo-tramites.service';
import { AlertContextService } from '../../../shared/alert/alert-context.service';
import { AlertComponent } from '../../../shared/alert/alert.component';

import * as R from 'ramda';

@Component({
    selector: 'app-agregar-grupo-tramites',
    styleUrls: ['/agregar-grupo-tramites.component.scss'],
    templateUrl: 'agregar-grupo-tramites.component.html'
})

export class AgregarGrupoTramitesComponent implements OnInit {
    idPuntoAtencion: number;
    editMode: boolean;
    grupoTramites: GrupoTramites;
    tramitesDisponibles: Tramite[];
    tramitesSeleccionados: Tramite[];
    agregarGrupoForm: FormGroup;
    optionsIntervalo: number[];

    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    constructor(
        private agregarGrupoTramitesService: AgregarGrupoTramitesService,
        private alertContextService: AlertContextService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.idPuntoAtencion = this.route.snapshot.params['idPuntoAtencion'];
        this.grupoTramites = this.route.snapshot.data['grupoTramites'] || {} as GrupoTramites;
        this.tramitesDisponibles = this.route.snapshot.data['tramitesDisponibles'];
        this.editMode = R.not(R.isEmpty(this.grupoTramites));

        this.agregarGrupoForm = new FormGroup({
            nombre: new FormControl('', [
                Validators.required
            ]),
            horizonte: new FormControl('', [
            // tslint:disable-next-line:no-magic-numbers
                Validators.required, Validators.min(1), Validators.max(365)
            ]),
            intervalo: new FormControl('', [
                Validators.required
            ]),
            tramites: new FormControl('', [
                Validators.min(1)
            ])
        });

        this.optionsIntervalo = this.route.snapshot.data['intervalo'] || {} as number[];

        this.tramitesSeleccionados = (this.editMode) ?
            this.grupoTramites.tramites : [];

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

    private createGrupoTramites(form: FormGroup): NuevoGrupoTramitesForm {
        // mapea lista de tramites a lista de ids
        const listaIds: number[] = this.tramitesSeleccionados
            .map(function(item: any) {
                return item.id;
            });

        return {
            nombre: form.value.nombre,
            intervalo: form.value.intervalo,
            horizonte: form.value.horizonte,
            id: this.grupoTramites.id || 0,
            tramites: listaIds
        }
    }

    onSubmit(capacidadComponent: any) {
        if (this.agregarGrupoForm.valid && capacidadComponent.rangosSuperpuestos.length === 0) {
            const grupoTramites: NuevoGrupoTramitesForm = this.createGrupoTramites(this.agregarGrupoForm);

            if (this.editMode) {
                this.agregarGrupoTramitesService.editarGrupoTramites(this.idPuntoAtencion, grupoTramites)
                    .subscribe((response: BackOfficeStatusResponse) => {
                        capacidadComponent.guardarCapacidad(this.grupoTramites.id);
                    }, ((err: ErrorSNT) => {
                        this.alertComponent.errors(err);
                    }));
            } else {
                this.agregarGrupoTramitesService.agregarGrupoTramites(this.idPuntoAtencion, grupoTramites)
                    .subscribe((response: BackOfficeStatusResponse) => {
                        const id = response.additional.id;
                        this.grupoTramites.id = id;
                        capacidadComponent.guardarCapacidad(id);
                    }, ((err: ErrorSNT) => {
                        this.alertComponent.errors(err);
                }));
            }
        }
    }

    onCapacidadSaved(event: EntityEditionStatus) {
        if (event.status === 'ok') {
            this.alertContextService.success((this.editMode) ?
                'Los cambios se han guardado exitosamente' :
                'El grupo de trámites se ha creado exitosamente');
            this.salir();
        } else {
            this.alertContextService.success('Error al editar la capacidad del grupo de trámites');
            this.salir();
        }
    }

    salir() {
        return (this.editMode ?
            this.router.navigate(['../../'], { relativeTo: this.route }) :
            this.router.navigate(['../'], { relativeTo: this.route }));
    }

}
