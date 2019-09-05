import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-etiqueta-tramite',
    templateUrl: 'etiqueta.component.html'
})

export class EtiquetaComponent implements OnInit {
    etiquetas: Etiqueta[];

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.etiquetas = this.route.snapshot.data['etiquetas'];

    }


}