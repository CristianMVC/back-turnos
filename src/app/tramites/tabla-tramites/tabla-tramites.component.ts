import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Either } from 'monet';
import { TramitesService } from './services/tramites.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import {CategoriasService} from "../../categoria-tramites/services/categoria.service";

@Component({
    selector: 'app-tabla-tramites',
    templateUrl: './tabla-tramites.component.html'
})
export class TablaTramitesComponent implements OnInit {
    @Input() tramitesPaginables: TramitesPaginables;
    @Input()  categoriasPaginables:  CategoriasPaginables;

    idOrganismo: number;
    idArea: number;
    pageSize: number;

    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private tramitesService: TramitesService,
        private categoriasService: CategoriasService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.idOrganismo = +params['idOrganismo'];
            this.idArea = +params['idArea'];
        });
        this.pageSize = this.tramitesService.getLimit();

    }

    onPageChange(offset: number) {
        this.tramitesService.getTramites(this.idOrganismo, this.idArea, offset)
            .subscribe((tramites: TramitesPaginables) => {
                this.tramitesPaginables = tramites;
            });
    }

    hasResults(): boolean {
        return this.tramitesPaginables.size > 0;
    }

    crearTramite() {
        this.router.navigate(['agregar'], { relativeTo: this.route });
    }

    editarTramite(tramite: Tramite) {
        this.router.navigate(['editar', tramite.id], { relativeTo: this.route });
    }

    sacarTurno(tramiteSeleccionado: Tramite) {
        
        sessionStorage.setItem("tramites_back",this.router.url);
        this.router.navigate(
          ['/turnos/seleccionTurno', tramiteSeleccionado.id ]
        )
      }
    
    tramiteRemoved(status: Either<ErrorStatus, SuccessStatus>) {
        status.cata(err => this.alertComponent.errors(err.message),
                    suc => {
                        this.onPageChange(0);
                        this.alertComponent.success(suc.message);
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
