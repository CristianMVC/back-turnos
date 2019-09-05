import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { JumbotronComponent } from '../../shared/shared.module';
import { ConfirmarTurnoService } from './services/confirmar-turno.service';
import { WizardContextService } from '../wizard-context.service';

import { AlertComponent } from '../../shared/alert/alert.component';

import * as moment from 'moment';
import * as R from 'ramda';
import { ValidateCuil } from './validate-cuil';
import { ValidateAlfanumerico } from './validate-alfanumerico';
import { environment } from "environments/environment";

@Component({
    selector: 'app-datos-tramite',
    styleUrls: ['datos-tramite.component.scss'],
    templateUrl: './datos-tramite.component.html'
})
export class DatosTramiteComponent implements OnInit {

    form: FormGroup
    tramiteId: number
    formulario: Formulario
    duracionCountdown: moment.Duration = moment.duration({ minutes: 5 });
    submitPressed = false;
    alert: Alert;
    

    @ViewChild(JumbotronComponent)
    private jumbotronComponent: JumbotronComponent

    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private wizardContext: WizardContextService,
        private confirmarTurnoService: ConfirmarTurnoService,
        private validateCuil: ValidateCuil,
        private validateAlfanumerico: ValidateAlfanumerico
    ) {  }

    ngOnInit() {
        this.jumbotronComponent.turnoStep(this.wizardContext.getNombreTramite(), this.wizardContext.getOrganismo());
        this.formulario = this.route.snapshot.data['formulario'];
        this.form = this.toFormGroup(this.formulario.fields);
        this.route.params.subscribe(params => { this.tramiteId = params['tramiteId'] });
    }

    onSubmit() {
        this.submitPressed = true;
        if (this.form.valid) {
            const turno = this.wizardContext.createTurno(this.form.value);
            if (turno) {
                this.confirmarTurnoService.confirmarTurno(turno)
                    .subscribe(() => {
                        return this.router.navigate(['../../confirmacionTurno', this.tramiteId], { relativeTo: this.route });
                    }, (errorSNT: TurnosErrorSNT) => {
                        this.alertComponent.errors(errorSNT.errors);
                        window.scrollTo(0, 0);
                    });
            }
        }
    }

    onTiempoExpirado() {
        this.router.navigate(['expiracion'], { relativeTo: this.route });
    }

    private toFormGroup(fields: TramiteField[]): FormGroup {
        let validators: ValidatorFn[];

        const controls = fields.map((f: TramiteField) => {
            validators = [];
            if (f.required) {
                validators.push(Validators.required);
            }
            if (f.label.toLowerCase().indexOf('cuil') !== -1) {
                validators.push(this.validateCuil.cuilValido);
            } else {
                validators.push(this.validateAlfanumerico.alfanumericoValido);
            }
            return new FormControl('', validators);
        });

        return new FormGroup(R.zipObj(R.map<TramiteField, string>(R.prop<string>('key'), fields), controls));
    }

    backStep(pages:number) {
        let back =  sessionStorage.getItem("tramites_back");
        if(back){
            window.location.href = back;
        }else{
            window.history.go(pages);
        }
    }

}
