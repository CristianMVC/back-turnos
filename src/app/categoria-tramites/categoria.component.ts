import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-categorias-tramite',
    templateUrl: 'categoria.component.html'
})

export class CategoriaComponent implements OnInit {
    categoriasPaginables: Categoria[];

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.categoriasPaginables = this.route.snapshot.data['categorias'];
       
    }

}
