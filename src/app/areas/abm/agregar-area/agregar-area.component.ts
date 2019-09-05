import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertComponent } from '../../../shared/alert/alert.component';

import { OrganismoUpdateEventService } from '../../../shared/shared.module';
import { AgregarAreaService } from './services/agregar-area.service';
import { AlertContextService } from '../../../shared/alert/alert-context.service';

import * as R from 'ramda';

@Component({
    selector: 'app-area',
    templateUrl: 'agregar-area.component.html',
    styleUrls: ['/agregar-area.component.scss']
})

export class AgregarAreaComponent implements OnInit {
    agregarAreaForm: FormGroup;
    area: Area;
    editMode: boolean;
    idOrganismo: number;
    private backState: string[];

    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    constructor(private agregarAreaService: AgregarAreaService,
        private alertContextService: AlertContextService,
        private route: ActivatedRoute,
        private router: Router,
        private organismoUpdateEventService: OrganismoUpdateEventService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.idOrganismo = +params['idOrganismo'];
            this.area = this.route.snapshot.data['area'] || {} as Area;
            this.editMode = R.not(R.isEmpty(this.area));
        });
        this.agregarAreaForm = new FormGroup({
            nombre: new FormControl('', [
                Validators.required
            ]),
            abreviatura: new FormControl('', [
                Validators.required
            ])
        });
        this.route.queryParams.subscribe(params => {
            this.backState = params['backUrl'];
        });
    }

    createNuevoArea(areaForm: FormGroup): NuevoAreaForm {
        return {
            nombre: areaForm.value.nombre,
            abreviatura: areaForm.value.abreviatura
        }
    }

    onSubmit() {
        if (this.agregarAreaForm.valid) {
            if (this.editMode) {
                this.agregarAreaService.editarArea(this.idOrganismo, this.area)
                    .subscribe((response: BackOfficeStatusResponse) => {
                        this.alertContextService.success('Los cambios se han guardado exitosamente');
                        this.organismoUpdateEventService.emit();
                        return this.goBack();
                    }, ((err: ErrorSNT) => {
                        this.alertComponent.errors(err);
                    }));
            } else {
                const nuevoArea: NuevoAreaForm = this.createNuevoArea(this.agregarAreaForm);
                this.agregarAreaService.agregarArea(this.idOrganismo, nuevoArea)
                    .subscribe((response: BackOfficeStatusResponse) => {
                        this.alertContextService.success('El área se ha creado exitosamente');
                        this.organismoUpdateEventService.emit();
                        return this.goBack();
                    }, ((err: ErrorSNT) => {
                        this.alertComponent.errors(err);
                    }));
            }
        }
    }

    cancelar() {
        return this.goBack();
    }

    private goBack() {
        if (this.editMode) {
            if (this.backState) {
                return this.router.navigate(this.backState, { queryParams: { redirect: 'tramites' } });
            } else {
                return this.router.navigate(['../../'], { relativeTo: this.route });
            }
        } else {
            if (this.backState) {
                return this.router.navigate(this.backState, { queryParams: { redirect: 'tramites' } });
            } else {
                return this.router.navigate(['../'], { relativeTo: this.route });
            }
        }
    }
}
