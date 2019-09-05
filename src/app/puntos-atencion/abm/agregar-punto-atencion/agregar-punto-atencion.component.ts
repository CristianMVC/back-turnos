import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { AlertContextService } from '../../../shared/alert/alert-context.service';

import { AgregarPuntoAtencionService } from './services/agregar-punto-atencion.service';
import { ProvinciaLocalidadService } from '../../../shared/services/provincia-localidad.service';

import * as R from 'ramda';

@Component({
    selector: 'app-punto-atencion',
    templateUrl: 'agregar-punto-atencion.component.html',
    styleUrls: ['agregar-punto-atencion.component.scss']
})

export class AgregarPuntoAtencionComponent implements OnInit {
    agregarPuntoAtencionForm: FormGroup;
    puntoAtencion: PuntoAtencion;
    editMode: boolean;
    idOrg: number;
    idArea: number;
    provincias: Provincia[];
    localidades: Localidad[];
    tramitesArea: Tramite[];
    tramitesPuntoAtencion: Tramite[];
    private backState: string[];
    keywords = new Subject<string>();
    provincia = new Subject<Provincia>();
    searchText = '';
    hidden = false;
    localidad: Localidad;

    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    constructor(
        private agregarPuntoAtencionService: AgregarPuntoAtencionService,
        private alertContextService: AlertContextService,
        private provinciaLocalidadService: ProvinciaLocalidadService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.idOrg = params['idOrganismo'];
            this.idArea = params['idArea'];
            this.puntoAtencion = this.route.snapshot.data['puntoAtencion'] || {} as PuntoAtencion;
            this.editMode = R.not(R.isEmpty(this.puntoAtencion));
            this.puntoAtencion.area = this.route.snapshot.data['area']
            this.puntoAtencion.estado = this.editMode ? this.puntoAtencion.estado : 1;
            this.searchText = this.puntoAtencion.localidad ? this.puntoAtencion.localidad.nombre : ''
            this.localidad = this.editMode ? this.puntoAtencion.localidad : {} as Localidad;
        });

        this.route.queryParams.subscribe(params => {
            this.backState = params['backUrl'];
        });

        this.provinciaLocalidadService.getProvincias().subscribe((response: Provincias) => {
            this.provincias = response.provincias;
        });

        this.agregarPuntoAtencionService.getAllTramitesByArea(this.idOrg, this.idArea).subscribe((result: any) => {
            this.tramitesArea = result;
        });

        this.tramitesPuntoAtencion = (this.editMode) ? this.puntoAtencion.tramites : [];

        this.agregarPuntoAtencionForm = new FormGroup({
            area: new FormControl(''),
            nombre: new FormControl('', [
                Validators.required
            ]),
            provincia: new FormControl('', [
                Validators.required
            ]),
            localidad: new FormControl('', [
                Validators.required
            ]),
            direccion: new FormControl('', [
                Validators.required
            ]),
            visible: new FormControl('', [
                Validators.required
            ]),
        });
        this.onProvinciaSelect();
        this.provincia.next(this.puntoAtencion.provincia);
    }
    equals(item1: any, item2: any): boolean {
        return (item1 && item2 && item1.id === item2.id);
    }

    onProvinciaSelect() {
        this.provinciaLocalidadService.getLocalidadesKeyword(this.keywords, this.provincia)
            .subscribe((response: Localidades) => {
                this.localidades = response.localidades;
            });
        }

    hideResults() {
        this.hidden = true;
    }

    showResults() {
        this.hidden = false;
    }


    onProvinciaChange() {
        this.localidades = [];
        this.puntoAtencion.localidad = {} as Localidad;
        this.searchText = '';
        this.provincia.next(this.puntoAtencion.provincia);
    }

    asignarValor(localidad: Localidad) {
        this.localidad = localidad;
        this.searchText = localidad.nombre;
        this.hideResults();
    }

    createNuevoPuntoAtencion(puntoAtencionForm: FormGroup): NuevoPuntoAtencionForm {
        const listaIds: number[] = this.tramitesPuntoAtencion
            .map(function(item: any) {
                return item.id;
            });

        return {
            nombre: puntoAtencionForm.value.nombre,
            provincia: puntoAtencionForm.value.provincia.id,
            localidad: this.localidad.id,
            direccion: puntoAtencionForm.value.direccion,
            area: this.idArea,
            tramites: listaIds,
            estado: this.puntoAtencion.estado,
            id: this.puntoAtencion.id || 0
        };
    }

    onSubmit() {
        if (this.agregarPuntoAtencionForm.valid) {
            const nuevoPuntoAtencion: NuevoPuntoAtencionForm = this.createNuevoPuntoAtencion(this.agregarPuntoAtencionForm);

            if (this.editMode) {
                this.agregarPuntoAtencionService.editarPuntoAtencion(nuevoPuntoAtencion)
                    .subscribe((response: any) => {
                        this.alertContextService.success('Los cambios se han guardado exitosamente');
                        this.goBack();
                    }, ((err: ErrorSNT) => {
                        this.alertComponent.errors(err);
                    }));
            } else {
                this.agregarPuntoAtencionService.agregarPuntoAtencion(nuevoPuntoAtencion)
                    .subscribe((response: any) => {
                        this.alertContextService.success('El punto de atención se ha creado exitosamente');
                        this.goBack();
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
                return this.router.navigate(this.backState, { queryParams: { redirect: 'horarios' } });
            } else {
                return this.router.navigate(['../../'], { relativeTo: this.route });
            }
        } else {
            if (this.backState) {
                return this.router.navigate(this.backState, { queryParams: { redirect: 'horarios' } });
            } else {
                return this.router.navigate(['../'], { relativeTo: this.route });
            }
        }
    }
}
