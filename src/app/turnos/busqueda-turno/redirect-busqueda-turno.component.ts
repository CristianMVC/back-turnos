import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusquedaTurnoContextService } from './busqueda-turno-context.service';

@Component({
    selector: 'app-redirect-busqueda-turno',
    template: ` `
})

export class RedirectBusquedaTurnoComponent implements OnInit {
    resultadoBusquedaTurno: ResultadoBusquedaTurno;
    constructor(private route: ActivatedRoute, private busquedaTurnoContext: BusquedaTurnoContextService, private router: Router) {}

    ngOnInit() {
        this.resultadoBusquedaTurno = this.route.snapshot.data['datosTurno'];
        this.busquedaTurnoContext.datosTurno(this.resultadoBusquedaTurno);
        this.router.navigate(['turnos/resultadoBusqueda',  this.resultadoBusquedaTurno.tramite.id]);
    }
}

