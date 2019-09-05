import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Either } from 'monet';
import { TramitesService } from '../../tramites/tabla-tramites/services/tramites.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import {CategoriasService} from "../../categoria-tramites/services/categoria.service";


@Component({
    selector: 'app-tabla-tramites-organismo',
    templateUrl: './tabla-tramites.component.html'
})
export class TablaTramitesOrganismoComponent implements OnInit {
    @Input() tramitesPaginables: TramitesPaginables;
    @Input()  categoriasPaginables:  CategoriasPaginables;
    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;
    tramite: NuevoTramiteForm;
    idOrganismo: number;
    pageSize: number;



    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private tramitesService: TramitesService,
        private categoriasService: CategoriasService

    ) { }


    ngOnInit() {
        this.route.params.subscribe(params => {
            this.idOrganismo = +params['idOrganismo'];
        });
        this.pageSize = this.tramitesService.getLimit();

    }

    onPageChange(offset: number) {
        this.tramitesService.getTramitesorg(this.idOrganismo, offset)
            .subscribe((tramites: TramitesPaginables) => {
                this.tramitesPaginables = tramites;
            });

    }


    hasResults(): boolean {
        return this.tramitesPaginables.size > 0;
    }


    editarTramite(tramite: Tramite) {
        this.router.navigate(['editar/tramite', tramite.id,'org'], { relativeTo: this.route });
    }

    tramiteRemoved(status: Either<ErrorStatus, SuccessStatus>) {
        status.cata(err => this.alertComponent.errors(err.message),
            suc => {
                this.onPageChange(0);
            })
    }


    modify($idCat: number, $idTram: number) {
        this.categoriasService.addTramite($idCat,$idTram ).subscribe((response: BackOfficeStatusResponse) => {
            this.alertComponent.success(response.userMessage);
        }, ((err: ErrorSNT) => {
            this.alertComponent.errors(err);
        }));

    }


}
