import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-tramites',
    templateUrl: 'tramites.component.html'
})

export class TramitesComponent implements OnInit {

    tramitesPaginables: Tramite[];
    idArea: number;
    private idOrganismo: string;
    categoriasPaginables: CategoriasPaginables;

    constructor(private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.idArea = +params['idArea'];
            this.idOrganismo = params['idOrganismo'];
        });
        this.tramitesPaginables = this.route.snapshot.data['tramites'];
        this.categoriasPaginables = this.route.snapshot.data['categorias'];
    }

    cancelar() {
        this.router.navigate(['organismos', this.idOrganismo, 'areas']);
    }
}
