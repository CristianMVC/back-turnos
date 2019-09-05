import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrganismosService } from './services/organismos.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import { OrganismoUpdateEventService } from '../../shared/shared.module';
import { Either } from 'monet';

@Component({
    selector: 'app-tabla-organismos',
    templateUrl: './tabla-organismos.component.html',
    styleUrls: ['tabla-organismos.component.scss']
})
export class TablaOrganismosComponent implements OnInit {

    @Input() organismosPaginables: OrganismosPaginables;

    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    pageSize: number;

    constructor(
        private organismosService: OrganismosService,
        private organismoUpdateEventService: OrganismoUpdateEventService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.pageSize = this.organismosService.getLimit();
    }

    onPageChange(offset = 0) {
        this.organismosService.getOrganismos(offset).subscribe((organismos: OrganismosPaginables) => {
            this.organismosPaginables = organismos;
        });
    }

    hasResults(): boolean {
        return this.organismosPaginables.size > 0;
    }

    editarOrganismo(organismo: Organismo) {
        this.router.navigate(['editar', organismo.id], { relativeTo: this.route });
    }

    verOrganismo(idOrg: number) {
        this.router.navigate([idOrg, 'areas'],
            { relativeTo: this.route });
    }

    organismoRemoved(status: Either<ErrorStatus, SuccessStatus>) {
        status.cata(err => {
            this.alertComponent.errors(err.message);
        }, suc => {
            this.organismoUpdateEventService.emit();
            this.onPageChange();
            this.alertComponent.success(suc.message);
        })
    }

}
