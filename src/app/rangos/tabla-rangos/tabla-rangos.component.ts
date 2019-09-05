import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RangosService } from '../tabla-rangos/services/rangos.service';
import { DiasSemanaService } from '../../shared/services/dias-semana.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import { Either } from 'monet';

@Component({
    selector: 'app-tabla-rangos',
    templateUrl: './tabla-rangos.component.html'
})
export class TablaRangosComponent implements OnInit {
    @Input() rangosPaginables: RangosPaginables;

    idPuntoAtencion: number;
    pageSize: number;

    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private rangoService: RangosService,
        private diasSemanaService: DiasSemanaService,
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.idPuntoAtencion = +params['idPuntoAtencion'];
        });
        this.pageSize = this.rangoService.getLimit();
    }

    onPageChange(offset: number) {
        this.rangoService.getAllRangos(this.idPuntoAtencion)
            .subscribe((rangos: RangosPaginables) => {
                this.rangosPaginables = rangos;
            });
    }

    hasResults(): boolean {
        return this.rangosPaginables.size > 0;
    }

    crearRango() {
        this.router.navigate(['agregar'], { relativeTo: this.route });
    }

    editar(rango: Rango) {
        this.router.navigate(['editar', rango.idRow], { relativeTo: this.route });
    }

    showDias(dias: number[]): string[] {
        const diasSemana = this.diasSemanaService.getDiasSemana();
        return dias.sort().map((dia: number) => {
            return diasSemana[dia - 1];
        });
    }

    rangoRemoved(status: Either<ErrorStatus, SuccessStatus>) {
        status.cata(
            err => this.alertComponent.errors(err.message),
            suc => {
                this.onPageChange(0);
                this.alertComponent.success(suc.message);
            })
    }

}
