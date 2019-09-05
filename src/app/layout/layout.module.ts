import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EventModule } from '../shared/shared.module';
import { SharedModule } from '../shared/shared.module';
import { OrganismosService } from '../organismos/organismos.module';
import { AreasService } from '../areas/tabla-areas/services/areas.service';
import { ApiVersionService } from './footer/services/api-version.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EventModule.forRoot(),
    SharedModule
  ],
  declarations:
  [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  providers: [
    OrganismosService,
    AreasService,
    ApiVersionService
  ],
  exports:
  [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class LayoutModule { }


