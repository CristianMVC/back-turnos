import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';

import * as R from 'ramda';
import * as moment from 'moment';

import { JumbotronComponent } from '../../shared/shared.module';
import { PuntosAtencionMapComponent } from './puntos-atencion/puntos-atencion.component';
import { DiasDisponiblesTurnoComponent } from './dias-disponibles-turno/dias-disponibles-turno.component';
import { HorariosDisponiblesTurnoComponent } from './horarios-disponibles-turno/horarios-disponibles-turno.component';
import { WizardContextService } from '../wizard-context.service'
import { ReservaTurnoService } from './services/reserva-turno.service';
import { ProvinciaLocalidadService } from './services/provincia-localidad.service';
import { LoadingStatus } from '../../shared/loading/loading-status';
import { LoaderService } from '../../shared/loader/loader.module';
import { environment } from "environments/environment";

@Component({
    selector: 'app-seleccion-turno',
    templateUrl: './seleccion-turno.component.html',
    styleUrls: ['./seleccion-turno.component.scss']
})
export class SeleccionTurnoComponent implements OnInit {

    provincias: Provincia[]
    localidades: Localidad[]
    criterio: SeleccionTurnoCriteria
    formSubmitted = false

    @ViewChild(PuntosAtencionMapComponent)
    private puntosAtencionComponent: PuntosAtencionMapComponent;

    @ViewChild(DiasDisponiblesTurnoComponent)
    private diasDisponiblesTurnoComponent: DiasDisponiblesTurnoComponent;

    @ViewChild(HorariosDisponiblesTurnoComponent)
    private horariosDisponiblesComponent: HorariosDisponiblesTurnoComponent;

    @ViewChild(JumbotronComponent)
    private jumbotronComponent: JumbotronComponent

    private loadingStatus: LoadingStatus
    loadingPuntoAtencion: LoadingStatus

    constructor(private route: ActivatedRoute,
        private router: Router,
        private provinciaLocalidadService: ProvinciaLocalidadService,
        private wizardContext: WizardContextService,
        private reservaTurnoService: ReservaTurnoService,
      //  private loaderService: LoaderService
        ) {}

    ngOnInit() {
        this.jumbotronComponent.turnoStep(this.wizardContext.getNombreTramite(), this.wizardContext.getOrganismo());
        this.criterio = this.wizardContext.getSeleccionTurnoCriteria() || {} as SeleccionTurnoCriteria;
        this.route.params.subscribe(params => { this.criterio.tramiteId = params['tramiteId'] });
        this.provincias = this.route.snapshot.data['provincias'];
        this.loadingStatus = new LoadingStatus();
        this.loadingPuntoAtencion = new LoadingStatus();

        const criteriaHistory = this.wizardContext.getSeleccionTurnoCriteria();
        if (criteriaHistory !== undefined ) {
            return this.onProvinciaSelect().then(() => {
                return this.onProvinciaLocalidadChange().then(() => {
                    this.puntosAtencionComponent.selectPuntoAtencion(criteriaHistory.puntoAtencion);
                    return this.visualizarDiasDisponibles(criteriaHistory).then(() => {
                        return this.visualizarHorariosDisponibles(criteriaHistory);
                    });
                });
            });
        } else {
            return Promise.resolve();
        }
    }

    equalsProvincias(p1: Provincia, p2: Provincia): boolean {
        return p1 && p2 ? p1.id === p2.id : p1 === p2;
    }

    equalsLocalidades(l1: Localidad, l2: Localidad): boolean {
        return l1 && l2 ? l1.id === l2.id : l1 === l2;
    }

    onProvinciaSelect(): Promise<void> {
        this.loadingStatus.start();
        return this.provinciaLocalidadService.getLocalidades(this.criterio.provincia.id, this.criterio.tramiteId)
            .toPromise().then((localidades: Localidad[]) => {
                this.localidades = localidades;
                this.criterio.localidad = {} as Localidad;
                this.loadingStatus.finish();
            });
    }

    onProvinciaLocalidadChange() {
        this.loadingPuntoAtencion.start();
        return this.puntosAtencionComponent.onChange(R.merge({}, this.criterio)).then(() => {
            this.loadingPuntoAtencion.finish();
            this.diasDisponiblesTurnoComponent.reset();
            this.horariosDisponiblesComponent.reset();
        });
    }

    puntoAtencionChange(puntoAtencion: TurnosPuntoAtencion) {
        this.criterio.puntoAtencion = puntoAtencion;
        this.diasDisponiblesTurnoComponent.reset();
    }

    fechaTurnoChange(date: moment.Moment) {
        this.criterio.fecha = date;
        this.horariosDisponiblesComponent.reset();
    }

    horarioTurnoChange(hora: string) {
        this.criterio.hora = hora;
    }

    private displayHorarios(fechaTurno: moment.Moment | undefined, puntoAtencion: TurnosPuntoAtencion | undefined) {
        return this.horariosDisponiblesComponent.updateHorarios(this.criterio.tramiteId, fechaTurno, puntoAtencion);
    }

    verHorarios(loadingStatus: LoadingStatus) {
        return this.displayHorarios(this.criterio.fecha, this.criterio.puntoAtencion).then(() => {
            return loadingStatus.finish();
        });
    }

    showErrorPuntoAtencion() {
        return this.formSubmitted && this.criterio && !this.criterio.puntoAtencion;
    }

    showErrorFecha() {
        return this.formSubmitted && this.diasDisponiblesTurnoComponent.isVisible()
         && this.criterio && !this.criterio.fecha;
    }

    showErrorHora() {
        return this.formSubmitted && this.criterio && !this.criterio.hora;
    }

    submitForm(formTurno: NgForm) {
        this.formSubmitted = true;
        if (formTurno.valid &&
            // custom validation
            this.criterio.puntoAtencion && this.criterio.fecha && this.criterio.hora) {
            this.nextStep();
        }
    }

    isLoading() {
        return this.loadingStatus.status();
    }

    private nextStep() {
      //  this.loaderService.show();
        return this.reservaTurnoService.reservarTurnoFromCriteria(this.criterio).
            cata(() => {
                // print error reserva can not be null
             //   this.loaderService.hide();
            }, (observable: Observable<ReservaTurnoResponse>) => {
                observable.subscribe((reservaResponse: ReservaTurnoResponse) => {
                    this.wizardContext.turnoReservado(reservaResponse, this.criterio);
                 //   this.loaderService.hide();
                    return this.router.navigate(['../../datosTramite', this.criterio.tramiteId],
                        { relativeTo: this.route });
                }, (errorSNT: TurnosErrorSNT) => {
                 //   this.loaderService.hide();
                    return this.router.navigate(['../../error'], { relativeTo: this.route, queryParams: { errors: errorSNT.errors } });
                });
            })
    }

    backStep() {
        let back =  sessionStorage.getItem("tramites_back");
        if(back){
            window.location.href = back;
            sessionStorage.removeItem("tramites_back");
        }else{
            window.history.back();
        }
    }

    verFechas(loadingStatus: LoadingStatus) {
        return this.visualizarDiasDisponibles(this.criterio).then(() => {
            return loadingStatus.finish();
        });
    }

    isDisabled() {
        return !this.horariosDisponiblesComponent.hasHorarioSelected();
    }

    private visualizarDiasDisponibles(criterio: SeleccionTurnoCriteria) {
         return this.diasDisponiblesTurnoComponent.onChange(R.merge({}, criterio)).then(() => {
            return this.diasDisponiblesTurnoComponent.display();
        });
    }

    private visualizarHorariosDisponibles(criterio: SeleccionTurnoCriteria) {
        return this.displayHorarios(criterio.fecha, criterio.puntoAtencion).then(() => {
            return this.horariosDisponiblesComponent.selectHorario(criterio.hora);
        });
    }

}

