import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Either } from 'monet';
import { CategoriasService } from '../tabla-categorias/services/categorias.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import { AgregarCategoriaService } from '../abm/abm-categorias.module';

@Component({
    selector: 'app-tabla-categorias',
    templateUrl: './tabla-categorias.component.html'
})
export class TablaCategoriasComponent implements OnInit {
    @Input() categoriasPaginables: CategoriasPaginables;

    idPuntoAtencion: number;
    pageSize: number;
    tramitesDisponibles: Tramite[];

    @ViewChild(AlertComponent)
     alertComponent: AlertComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private categoriasService: CategoriasService,
        private agregarCategoriaService: AgregarCategoriaService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.idPuntoAtencion = +params['idPuntoAtencion'];
        });
        this.pageSize = this.categoriasService.getLimit();
        this.tramitesDisponibles = this.route.snapshot.data['tramitesDisponibles'];
    }

    onPageChange(offset: number) {
        this.categoriasService.getCategorias(this.idPuntoAtencion, offset)
            .subscribe((categorias: CategoriasPaginables) => {
                this.categoriasPaginables = categorias;
            });
    }

    hasResults(): boolean {
        return this.categoriasPaginables.size > 0;
    }

    crearCategoria() {
        this.router.navigate(['agregar'], { relativeTo: this.route });
    }

    editar(categoria: Categoria) {
        this.router.navigate(['editar', categoria.id], { relativeTo: this.route });
    }

    categoriaRemoved(status: Either<ErrorStatus, SuccessStatus>) {
        status.cata(
            err => this.alertComponent.errors(err.message),
            suc => {
                this.onPageChange(0);
                this.alertComponent.success(suc.message);
            });
        this.updateTramitesDisponibles();
    }

    private updateTramitesDisponibles() {
        this.agregarCategoriaService.getTramitesDisponibles(this.idPuntoAtencion)
            .subscribe((tramites: Tramite[]) => {
                this.tramitesDisponibles = tramites;
            });
    }

    hayTramitesDisponibles() {
        return this.tramitesDisponibles && this.tramitesDisponibles.length > 0;
    }
}
