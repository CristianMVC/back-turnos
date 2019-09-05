import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { AgregarOrganismoService } from './services/agregar-organismo.service';
import { AlertContextService } from '../../../shared/alert/alert-context.service';
import { OrganismoUpdateEventService } from '../../../shared/shared.module';

import * as R from 'ramda';

@Component({
    selector: 'app-organismos',
    templateUrl: 'agregar-organismo.component.html',
    styleUrls: ['/agregar-organismo.component.scss']
})

export class AgregarOrganismoComponent implements OnInit {
    agregarOrganismoForm: FormGroup;
    organismo: Organismo;
    editMode: boolean;
    private backState: string[];

    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    constructor (
        private agregarOrganismoService: AgregarOrganismoService,
        private alertContextService: AlertContextService,
        private organismoUpdateEventService: OrganismoUpdateEventService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.backState = params['backUrl'];
        });
        this.route.params.subscribe(params => {
            this.organismo = this.route.snapshot.data['organismo'] || {} as Organismo;
            this.editMode = R.not(R.isEmpty(this.organismo));
        });
        this.agregarOrganismoForm = new FormGroup({
            nombre: new FormControl('', [
                Validators.required
            ]),
            abreviatura: new FormControl('', [
                Validators.required
            ])
        });
    }

    createNuevoOrganismo(organismoForm: FormGroup): NuevoOrganismoForm {
        return {
            nombre: organismoForm.value.nombre,
            abreviatura: organismoForm.value.abreviatura
        }
    }

    onSubmit() {
        if (this.agregarOrganismoForm.valid) {
            if (this.editMode) {
                this.agregarOrganismoService.editarOrganismo(this.organismo)
                    .subscribe((response: any) => {
                        this.alertContextService.success('Los cambios se han guardado exitosamente');
                        this.organismoUpdateEventService.emit();
                        return this.cancelar();
                    }, ((err: ErrorSNT) => {
                        this.alertComponent.errors(err);
                    }));
            } else {
                const nuevoOrganismo: NuevoOrganismoForm = this.createNuevoOrganismo(this.agregarOrganismoForm);
                this.agregarOrganismoService.agregarOrganismo(nuevoOrganismo)
                    .subscribe((response: any) => {
                        this.alertContextService.success('El organismo se ha creado exitosamente');
                        this.organismoUpdateEventService.emit();
                        return this.cancelar();
                    }, ((err: ErrorSNT) => {
                        this.alertComponent.errors(err);
                    }));
            }
        }
    }

    cancelar() {
        if (this.backState) {
            return this.router.navigate(this.backState);
        } else {
            return this.router.navigate(['organismos']);
        }
    }
}
