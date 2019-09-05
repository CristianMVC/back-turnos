import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-areas',
    templateUrl: 'areas.component.html'
})

export class AreasComponent implements OnInit {
    tramitesPaginables: TramitesPaginables;
    categoriasPaginables: CategoriasPaginables;
    areasPaginables: Area[];
    submitPressed: boolean;
    notNull: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.submitPressed = false;
        this.route.params.subscribe(params => {
            this.areasPaginables = this.route.snapshot.data['areas'],
            this.tramitesPaginables = this.route.snapshot.data['tramites'],
                this.categoriasPaginables = this.route.snapshot.data['categorias']
        });

    }

    onSubmit() {
        this.submitPressed = true;
    }

    cancelar() {
        this.router.navigate(['../organismos']);
    }
}
