
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarioService } from '../../calendario/services/calendario.service';
import { DiasDeshabilitadosService } from '../../dias-deshabilitados/services/dias-deshabilitados.service';
import { DiasDeshabilitadosTramiteService } from '../../tramites-pda/dias-deshabilitados-tramite/services/dias-deshabilitados-tramite.service';
import { AlertContextService } from '../alert/alert-context.service';

import * as moment from 'moment';

@Component({
    selector: 'app-lista-feriados',
    templateUrl: 'lista-feriados.component.html',
    styleUrls: ['./lista-feriados.component.scss']
})

export class ListaFeriadosComponent {
    @Input() idPuntoAtencion: number
    @Input() idTramite: number
    @Input() feriados: moment.Moment[]

    @Output() habilitarDiaEvent: EventEmitter<void> = new EventEmitter<void>()

    constructor(private calendarioService: CalendarioService,
        private diasDeshabilitadosService: DiasDeshabilitadosService,
        private alertContextService: AlertContextService, 
        private diasDeshabilitadosTramiteService: DiasDeshabilitadosTramiteService) { }

    habilitarDia(date: moment.Moment, idPuntoAtencion?: number,idTramite?: number) {
        if (idTramite && idPuntoAtencion) {
            this.diasDeshabilitadosTramiteService.eliminarDiaDeshabilitadoTramite(idPuntoAtencion, moment(date).format('YYYY-MM-DD'), idTramite)
                .subscribe((response: any) => {
                    this.alertContextService.success('Feriado Nacional habilitado con éxito');
                }, ((err: Error) => {
                    this.alertContextService.error('Error al habilitar Feriado Nacional');
                }), () => {
                    this.habilitarDiaEvent.emit();
                });
        } else
        if (idPuntoAtencion) {
            this.diasDeshabilitadosService.eliminarDiaDeshabilitado(idPuntoAtencion, moment(date).format('YYYY-MM-DD'))
                .subscribe((response: any) => {
                    this.alertContextService.success('Feriado Nacional habilitado con éxito');
                }, ((err: Error) => {
                    this.alertContextService.error('Error al habilitar Feriado Nacional');
                }), () => {
                    this.habilitarDiaEvent.emit();
                });
        } else {
            this.calendarioService.eliminarFeriadoNacional(moment(date).format('YYYY-MM-DD'))
                .subscribe((response: any) => {
                    this.alertContextService.success('Feriado Nacional habilitado con éxito');
                }, ((err: Error) => {
                    this.alertContextService.error('Error al habilitar Feriado Nacional');
                }), () => {
                    this.habilitarDiaEvent.emit();
                });
        }
    }
}
