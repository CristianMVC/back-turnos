import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WizardContextService } from '../../wizard-context.service';
import { TramitesService } from '../services/tramites.service';

@Component({
  selector: 'app-tramites-list',
  templateUrl: './tramites-list.component.html',
  styleUrls: ['./tramites-list.component.scss']
})
export class TramitesListComponent implements OnInit {

  tramitesPaginables: TurnosTramitesPaginables;
  pageSize: number;
  private keywords: string[];

  constructor(
    private wizardContext: WizardContextService,
    private route: ActivatedRoute,
    private router: Router,
    private tramiteService: TramitesService) { }

  ngOnInit() {
    this.pageSize = this.tramiteService.getLimit();
    this.tramitesPaginables = this.route.snapshot.data['tramites'];
    this.keywords = [];
  }

  onPageChange(offset: number) {
    this.tramiteService.getTramites(this.keywords, offset).subscribe((tramites: TurnosTramitesPaginables) => {
      this.tramitesPaginables = tramites;
    });
  }

  onFilterChange(keywords: string[]) {
    this.keywords = keywords;
    this.tramiteService.getTramites(this.keywords).subscribe((tramites: TurnosTramitesPaginables) => {
      this.tramitesPaginables = tramites;
    });
  }

  selectTramite(tramiteSeleccionado: TurnosTramite) {
    this.wizardContext.tramite(tramiteSeleccionado);

    this.router.navigate(
      ['/turnos/seleccionTurno', tramiteSeleccionado.id ],
      //{ relativeTo: this.route }
      )
  }

  hasResults(): boolean {
    return this.tramitesPaginables.size > 0;
  }

}
