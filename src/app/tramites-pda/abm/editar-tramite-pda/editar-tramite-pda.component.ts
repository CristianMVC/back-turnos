import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { EditarTramitePdaService } from './services/editar-tramite-pda.service';
import { AlertContextService } from '../../../shared/alert/alert-context.service';
import { AlertComponent } from '../../../shared/alert/alert.component';

import * as R from 'ramda';

@Component({
    selector: 'app-editar-tramitepda',
    templateUrl: 'editar-tramite-pda.component.html'
}) 

export class EditarTramitePdaComponent implements OnInit {
    idPuntoAtencion: number;
    editMode: boolean;
    tramitepda: TramitePdaFormEdit;
    idTramite: number;
  
    editarTramitePdaForm: FormGroup;
    

    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    constructor(
        private editarTramitePdaService: EditarTramitePdaService,
        private alertContextService: AlertContextService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.idPuntoAtencion = this.route.snapshot.params['idPuntoAtencion'];
        this.tramitepda = this.route.snapshot.data['tramitepda'] || {} as TramitePda;
        this.idTramite = this.route.snapshot.params['idTramite'];
        this.editMode = R.not(R.isEmpty(this.tramitepda));

        this.editarTramitePdaForm = new FormGroup({
            multiple: new FormControl('', [Validators.required]),
            multiple_max: new FormControl('', []),
            multiple_horizonte: new FormControl('', []),
            permite_otro: new FormControl('', [Validators.required]),
            permite_otro_cantidad: new FormControl('', []),
            multiturno: new FormControl('', [Validators.required]),
            multiturno_cantidad: new FormControl('', []),
            permite_prioridad: new FormControl('', []),
            deshabilitar_hoy: new FormControl('', [])
            
        });
        
    }

    onSubmit() {
        if (this.editarTramitePdaForm.valid) {
            this.editarTramitePdaService.editarTramitePdaInfo(this.idPuntoAtencion,this.idTramite, this.tramitepda )
                .subscribe((response: BackOfficeStatusResponse) => {
                    this.alertContextService.success(response.userMessage);
                    this.salir();
                }, ((err: ErrorSNT) => {
                    this.alertComponent.errors(err);
                }));
        }
    }

    salir() {
        return this.router.navigate(['../../'], { relativeTo: this.route });
    }
}
