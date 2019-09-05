import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from './shared/services/session.service';

@Component({
    template: ''
})
export class LoginNavigationComponent implements OnInit {

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private sessionService: SessionService
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            const destino = params['destino'];
            this.navigate(destino);
        });
    }

    private navigate(destino: string | undefined) {
        if (destino && destino !== 'administrar') {
            return this.router.navigate([destino]);
        } else {
            return this.chooseNavigation();
        }
    }

    private chooseNavigation() {
        const organismoId = this.sessionService.getOrganismoId();
        const areaId = this.sessionService.getAreaId();
        const puntoAtencionId = this.sessionService.getPuntoAtencionId();
        if (puntoAtencionId) {
            return this.router.navigate(['organismos', organismoId, 'areas', areaId, 'puntosAtencion',
                puntoAtencionId, 'tabs'], { queryParams: { redirect: 'horarios' } })
        } else {
            if (areaId) {
                return this.router.navigate(['organismos', organismoId, 'areas', areaId, 'tabs'], { queryParams: { redirect: 'tramites' } })
            } else {
                return this.router.navigate(['organismos'])
            }
        }
    }
}
