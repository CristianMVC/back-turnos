import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-categorias',
    templateUrl: 'categorias.component.html'
})

export class CategoriasComponent implements OnInit {

    categoriasPaginables: Categoria[];
    idPuntoAtencion: number;
    idOrganismo: string;
    idArea: string;

    constructor( private route: ActivatedRoute ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.idPuntoAtencion = +params['idPuntoAtencion'];
            this.idOrganismo = params['idOrganismo'];
            this.idArea = params['idArea'];
        });
        this.categoriasPaginables = this.route.snapshot.data['categorias'];
    }

}
