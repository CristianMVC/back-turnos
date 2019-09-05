import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EventModule, OrganismoUpdateEventService } from './global-events/event.module';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationService } from './pagination/pagination.service';
import { SelectMultipleComponent } from './select-multiple/select-multiple.component';
import { SntDatePicker } from './date-picker/date-picker.module';
import { ModalComponent } from './modal/modal.component';
import { AlertComponent } from './alert/alert.component';
import { SwitchComponent } from './switch/switch.component';
import { HighlightPipe } from './pipes/highlight.pipe'
import { FulldatePipe } from './pipes/date.pipe'
import { AuthenticationRolDirective } from './rol/authentication-rol.directive';
import { FormComponentTypePipe } from './pipes/form-component-type.pipe'
import { FormFieldTypePipe } from './pipes/form-field-type.pipe'
import { AlertContextService } from './alert/alert-context.service';
import { ProvinciaLocalidadService } from './services/provincia-localidad.service';
import { DiasSemanaService } from './services/dias-semana.service';
import { ValidationMessagesComponent } from './validation-messages/validation-messages.component';
import { ListaFeriadosComponent } from './lista-feriados/lista-feriados.component';
import { SessionService } from './services/session.service';
import { RolService } from './services/rol.service';
import { HttpSNT } from './services/http-snt';
import { LoaderComponent } from './loader/loader.component';
import { LoaderModule } from './services/loader.module';
import { EncrypterModule } from './services/encrypter.module';
import { RolPipe } from './pipes/rol.pipe';
import { LogoutService } from './services/logout.service';
import { ExpirationModule } from './expiration/expiration.module';
import { ExpirationComponent } from './expiration/expiration.component';
import { ToggleComponent } from './toggle/toggle.component';
import { JWBootstrapSwitchModule } from 'jw-bootstrap-switch-ng2';
import { InputMaxDirective } from './inputMaxValidation/input-max.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JWBootstrapSwitchModule
  ],
  providers: [
    PaginationService,
    AlertContextService,
    ProvinciaLocalidadService,
    DiasSemanaService,
    RolService,
    SessionService,
    LogoutService,
    HttpSNT
  ],
  declarations: [
    PaginationComponent, SelectMultipleComponent, ModalComponent, SwitchComponent, ToggleComponent,
    AlertComponent, ListaFeriadosComponent, ValidationMessagesComponent, ExpirationComponent,
    AuthenticationRolDirective,
    HighlightPipe, FulldatePipe, FormComponentTypePipe, FormFieldTypePipe, LoaderComponent,
    RolPipe, InputMaxDirective],
  exports: [
    PaginationComponent, SelectMultipleComponent, ModalComponent,
    SwitchComponent, ToggleComponent, AlertComponent, ListaFeriadosComponent,
    ValidationMessagesComponent, ExpirationComponent,
    SntDatePicker, AuthenticationRolDirective,
    HighlightPipe, FulldatePipe, FormComponentTypePipe, FormFieldTypePipe, LoaderComponent,
    RolPipe, InputMaxDirective]
})
export class SharedModule { }

export {
  ModalComponent, AlertComponent, SelectMultipleComponent, ExpirationComponent,
  OrganismoUpdateEventService, EventModule, LoaderModule,
  EncrypterModule, ExpirationModule }
