import { Component, OnInit, ViewChild } from '@angular/core';
    import { Router, ActivatedRoute } from '@angular/router';

import { AgregarTramiteService } from './services/agregar-tramite.service';
import { RolService } from '../../../shared/services/rol.service';
import { TramiteFormFactory } from './services/tramite-form-factory';
import { AlertContextService } from '../../../shared/alert/alert-context.service';
import { AlertComponent } from '../../../shared/alert/alert.component';

import * as R from 'ramda';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import {AreasService} from "../../../areas/tabla-areas/services/areas.service";
import {EtiquetasService} from "../../../etiqueta-tramites/services/etiqueta.service";

@Component({
    selector: 'app-tramites',
    templateUrl: 'agregar-tramite.component.html',
    styleUrls: ['agregar-tramite.component.scss']
})

export class AgregarTramiteComponent implements OnInit {
    tramite: NuevoTramiteForm;
    editMode: boolean;
    disableExcepcional: boolean;
    idOrganismo: number;
    private idArea: number;
    agregarTramiteForm: FormGroup;
    private areasPaginables: AreasPaginables;
    private etiquetasPaginables: EtiquetasPag;
    private org: boolean;
    idTramite: number;
    areastramite: Array<any>;
    selectAreas: number;
    errorTramite: string;


    camposDisponibles: TramiteField[] = []
    camposSeleccionados: TramiteField[] = []
    camposFijos: TramiteField[] = []
    cdChecked: TramiteField[] = []
    csChecked: TramiteField[] = []
    csCheckedIds: number[] = []
    areas: number[] = []
    etiquetas: Etiqueta[] = []
    etiquetasAsignadas: Etiqueta[] = []
    nombreEtiqueta: String[] = []

    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    constructor(
        private agregarTramiteService: AgregarTramiteService,
        private rolService: RolService,
        private alertContextService: AlertContextService,
        private route: ActivatedRoute,
        private areasService: AreasService,
        private etiquetasService: EtiquetasService,
        private router: Router) { }

    ngOnInit() {

        this.route.params.subscribe(params => {
            this.idOrganismo = +params['idOrganismo'];
            this.idArea = +params['idArea'];
            this.idTramite = +params['idTramite'];
        });


        this.route.snapshot.url.forEach((element) => {
            if(element.path == 'org') {
                this.org = true;
            } else {
                this.org = false;
            }

        });



        this.agregarTramiteService.getAreasTramite(this.idTramite).subscribe((resultado: Array<any>) => {

            resultado.forEach((element) => {

                this.areas.push(element.id);

                });

            this.areastramite = resultado;
        });

        this.areasService.getAreas(this.idOrganismo).subscribe((areas: AreasPaginables) => {
            this.areasPaginables = areas;
        });


        this.etiquetasService.getEtiquetasAsignadas(this.idTramite).subscribe((etiquetas: EtiquetasPag) => {
            this.etiquetasAsignadas =  etiquetas.etiquetas;

            this. etiquetasService.getEtiquetas(0,100).subscribe((etiquetas: EtiquetasPag) => {
                let list: Etiqueta[]  = [];

                if(this.etiquetasAsignadas.length > 0) {
                    etiquetas.etiquetas.forEach((element) => {
                        if (this.etiquetasAsignadas.find(x => x.id == element.id)) {
                        } else {
                            list.push(element);
                        }
                    });
                    this.etiquetas = list;
                } else {
                    this. etiquetas = etiquetas.etiquetas;
                }
            });
        });




        this.tramite = this.route.snapshot.data['tramite'] || {} as NuevoTramiteForm;
        this.editMode = R.not(R.isEmpty(this.tramite));
        this.disableExcepcional = !this.rolService.isAdminLogged();
        if (!this.editMode && this.disableExcepcional) {
            this.tramite.excepcional = 0;
        }

        this.agregarTramiteForm = new FormGroup({
            nombre: new FormControl('', [Validators.required]),
            descripcion: new FormControl('', []),
            // tslint:disable-next-line:no-magic-numbers
            duracion: new FormControl('', [Validators.required, Validators.min(5), Validators.max(480)]),
            requisitosAsString: new FormControl('', []),
            visibilidad: new FormControl('', [Validators.required]),
            excepcional: new FormControl('', [Validators.required]),
            selectArea: new FormControl('', [])
           
        });

        this.splitCampos(this.route.snapshot.data['camposDisponibles'] || [] as TramiteField[]);

        if (this.editMode) {
            this.fillCamposSeleccionados();
        } else {
            this.camposSeleccionados = this.camposFijos;
        }


    }

    private splitCampos(campos: TramiteField[]) {
        const camposValues = R.values(campos);
        camposValues.forEach((campo: TramiteField) => {
            if (!campo.mandatory) {
                this.camposDisponibles.push(campo);
            } else {
                campo.inicial = true;
                this.camposFijos.push(campo);
            }
        });
    }

    showLabel(campo: TramiteField): string {
        if (campo.key === 'cuil') {
            if (this.tramite.excepcional) {
                campo.label = 'Documento extranjero';
            } else {
                campo.label = 'CUIT/CUIL';
            }
        }
            return campo.label;
    }

    fillCamposSeleccionados() {
        this.tramite.campos.forEach((campo: TramiteField) => {
            this.agregarCampoSeleccionado(campo);
            this.quitarCampoDisponible(campo);
        });
    }

    agregarCampoSeleccionado(campo: TramiteField) {
        this.camposSeleccionados.push(campo);
    }

    quitarCampoDisponible(campo: TramiteField) {
        this.camposDisponibles = this.camposDisponibles.filter((c) => {
            return R.not(R.equals(campo.key, c.key));
        });
    }

    checkCampoDisponible(event: any, item: TramiteField) {
        if (event.target.checked) {
            this.cdChecked.push(item);
        } else {
            const findIdx = R.findIndex(R.propEq('key', item.key))(this.cdChecked);
            this.cdChecked.splice(findIdx, 1);
        }
    }

    agregarAlFormulario() {
        this.cdChecked.forEach((cds) => {
            this.camposSeleccionados.push(cds);
            this.camposDisponibles = R.without([cds], this.camposDisponibles);
        });
        this.cdChecked = [];
    }

    checkCampoSeleccionado(event: any, item: TramiteField, index: number) {
        if (event.target.checked) {
            this.csChecked.push(item);
            this.csCheckedIds.push(index);
        } else {
            const findIdx = R.findIndex(R.equals(index))(this.csCheckedIds);
            this.csChecked.splice(findIdx, 1);
            this.csCheckedIds.splice(findIdx, 1);
        }
    }

    quitarDelFormulario() {
        this.csChecked.forEach((css) => {
            this.camposDisponibles.push(css);
            this.camposSeleccionados = R.without([css], this.camposSeleccionados);
        });
        this.csChecked = [];
    }

    mandatoryFieldSelected(csChecked: TramiteField[]) {
        let mandatoryFieldSelected = false;
        csChecked.forEach((cs) => {
            if (cs.mandatory) {
                mandatoryFieldSelected = true;
                return;
            }
        });
        return mandatoryFieldSelected;
    }

    disableAddOptions() {
        return this.cdChecked.length === 0;
    }

    disableRemoveOptions() {
        return this.csChecked.length === 0 || this.mandatoryFieldSelected(this.csChecked);
    }

    sortDown(a: number, b: number) {
        return b - a;
    };

    moveDown() {
        let el;
        this.csCheckedIds = R.sort(this.sortDown, this.csCheckedIds);
        this.csCheckedIds.forEach((id, i) => {
            el = R.nth(id, this.camposSeleccionados);
            this.camposSeleccionados = R.remove(id, 1, this.camposSeleccionados);
            this.camposSeleccionados = R.insert(id + 1, el, this.camposSeleccionados);
            this.csCheckedIds[i]++;
        });
    }

    disableMoveDownOption() {
        return this.csChecked.length === 0 || this.csCheckedIds.indexOf(this.camposSeleccionados.length - 1) !== -1;
    }

    sortUp(a: number, b: number) {
        return a - b;
    };

    disableMoveUpOption() {
        return this.csChecked.length === 0 || this.csCheckedIds.indexOf(0) !== -1;
    }

    moveUp() {
        let el;
        this.csCheckedIds = R.sort(this.sortUp, this.csCheckedIds);
        this.csCheckedIds.forEach((id, i) => {
            el = R.nth(id, this.camposSeleccionados);
            this.camposSeleccionados = R.remove(id, 1, this.camposSeleccionados);
            this.camposSeleccionados = R.insert(id - 1, el, this.camposSeleccionados);
            this.csCheckedIds[i]--;
        });
    }

    tramiteFieldCreated(tramiteField: TramiteField) {
        this.camposSeleccionados.push(tramiteField);
    }

    sortCampos() {
        this.camposSeleccionados.forEach((campo: TramiteField, index: number) => {
            campo.order = index;
        })
    }



    checkAreaTramite(index: number) {
        var check: boolean;
        check = false;
        var value: number;

        if(Array.isArray(this.areastramite)) {
            this.areastramite.forEach((element) => {
                if (index == element.id) {


                    check = true;
                }

            });

        }
        return check;

    }



    agregarAreas(event: any, valor: number) {

        if (event.target.checked) {
            if (this.areas.indexOf(valor) < 0) {
                this.areas.push(valor);
            }

        } else {
            if (this.areas.indexOf(valor) >= 0) {
                this.areas.forEach((value) =>{
                     if(value == valor) {
                       var index =   this.areas.indexOf(value);
                       this.areas.splice(index, 1);
                     }

                });

            }

        }

    }


    mensajeTramite() {
      this.errorTramite = "Debe ingresar al menos un área";

    }

    onSubmit() {
       if(this.areas.length === 0 && this.org === true) {
           this.mensajeTramite();
           return;
       }

        if (this.agregarTramiteForm.valid) {
            this.sortCampos();

            if(!this.org && !this.editMode) {
                this.areas.push(this.idArea);
            }

            if(this.idTramite) {

                this.etiquetasAsignadas.forEach((element) => {
                    this.nombreEtiqueta.push(element.nombre);
                });

                this.etiquetasService.asignarEtiquetas(this.nombreEtiqueta, this.idTramite).subscribe((response: BackOfficeStatusResponse) => {

                }, ((err: ErrorSNT) => {
                    this.alertComponent.errors(err);
                }));
            }

            const nuevoTramite: NuevoTramiteForm = TramiteFormFactory.create(this.tramite, this.camposSeleccionados, this.areas, this.org);
            if (this.editMode) {
                this.agregarTramiteService.editarTramite(nuevoTramite)
                    .subscribe((response: BackOfficeStatusResponse) => {
                        this.alertContextService.success('Los cambios se han guardado exitosamente');
                        if(!this.org) { 
                            this.router.navigate(['../../'], { relativeTo: this.route }) 
                        }else{
                            this.router.navigate(['organismos',this.idOrganismo,'areas']);
                        }
                    }, ((err: ErrorSNT) => {
                        this.alertComponent.errors(err);
                    }));
            } else {
                this.agregarTramiteService.agregarTramite(nuevoTramite)
                    .subscribe((response: BackOfficeStatusResponse) => {
                        this.alertContextService.success('El trámite se ha creado exitosamente');
                        if(!this.org) { 
                            this.router.navigate(['../'], { relativeTo: this.route }) 
                        }else {
                            this.router.navigate(['organismos',this.idOrganismo,'areas']) 
                        }
                    }, ((err: ErrorSNT) => {
                        this.alertComponent.errors(err);
                    }));
            }
        }
    }


    hayCamposDisponibles() {
        return this.camposDisponibles.length > 0;
    }

    cancelar() {
        if(this.org){
            return this.router.navigate(['organismos',this.idOrganismo,'areas']);
        }
        return (this.editMode ?
            this.router.navigate(['../../'], { relativeTo: this.route }) :
            this.router.navigate(['../'], { relativeTo: this.route }));
    }

}

