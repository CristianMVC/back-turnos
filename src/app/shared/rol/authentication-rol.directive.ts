import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { RolService } from '../services/rol.service';

@Directive({ selector: '[appAuthRol]' })
export class AuthenticationRolDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private rolService: RolService
  ) { }

  @Input() set appAuthRol(nombreLink: string) {
      if (this.rolService.seDebeMostrarLink(nombreLink)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
  }

}
