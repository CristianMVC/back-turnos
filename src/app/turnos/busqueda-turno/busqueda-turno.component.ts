import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { JumbotronComponent } from '../shared/shared.module';
import { BusquedaTurnoService } from './services/busqueda-turno.service';
import { BusquedaTurnoContextService } from './busqueda-turno-context.service';

import * as R from 'ramda';

@Component({
    selector: 'app-busqueda-turno',
    templateUrl: 'busqueda-turno.component.html',
    styleUrls: ['/busqueda-turno.component.scss']
})

export class BusquedaTurnoComponent implements OnInit {
    submitPressed: boolean
    turnoNoEncontrado: boolean
    busquedaForm: FormGroup

    @ViewChild(JumbotronComponent)
    private jumbotronComponent: JumbotronComponent

    constructor(private busquedaTurnoService: BusquedaTurnoService,
        private busquedaTurnoContext: BusquedaTurnoContextService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.jumbotronComponent.busquedaTurnoStep();
        this.submitPressed = false;
        this.turnoNoEncontrado = false;

        const codigoMinLength = 8;
        const codigoMaxLength = 8;
        this.busquedaForm = new FormGroup({
            cuil: new FormControl('', [
                Validators.required
            ]),
            codigo: new FormControl('', [
                Validators.required,
                Validators.minLength(codigoMinLength),
                Validators.maxLength(codigoMaxLength),
                Validators.pattern('^[a-zA-Z0-9]{8}$')
            ])
        });
    }

    onSubmit() {
        this.submitPressed = true;
        if (this.busquedaForm.valid) {
            this.busquedaTurnoService.buscarTurno(this.busquedaForm.value.cuil, this.busquedaForm.value.codigo)
            .subscribe((datosTurno: ResultadoBusquedaTurno) => {
                if (R.not(R.isEmpty(datosTurno))) {
                    this.busquedaTurnoContext.datosTurno(datosTurno);
                    this.router.navigate(['../resultadoBusqueda', datosTurno.tramite.id], { relativeTo: this.route });
                }
            }, (err: Error) => {
                this.turnoNoEncontrado = true;
            });
        }
    }

    intentarNuevamente() {
        this.turnoNoEncontrado = false;
    }
}
