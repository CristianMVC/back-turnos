import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationComponent } from './pagination/pagination.component';
import { PaginationService } from './pagination/pagination.service';
import { SntDatePicker } from './date-picker/date-picker.module';
import { CountdownComponent } from './countdown/countdown.component';
import { ModalComponent } from './modal/modal.component';
import { ModalCancelarTurnoComponent } from './modal/modal-cancelar-turno/modal-cancelar-turno.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component'
import { DatosTurnoComponent } from './datos-turno/datos-turno.component';
import { AlertComponent } from './alert/alert.component';

import { HighlightPipe } from './pipes/highlight.pipe'
import { FulldatePipe } from './pipes/date.pipe'
import { CodigoReservaPipe } from './pipes/codigo-reserva.pipe'
import { SortByPipe } from './pipes/sortby.pipe'
import { ShortTimePipe } from './pipes/short-time';

import { CancelarTurnoService } from './modal/modal-cancelar-turno/services/cancelar-turno.service'
import { AlertContextService } from './alert/alert-context.service';
import { LoaderComponent } from './loader/loader.component';
import { LoaderModule } from './loader/loader.module';

@NgModule({
  imports: [CommonModule],
  providers: [PaginationService, CancelarTurnoService, AlertContextService],
  declarations: [
    PaginationComponent,
    CountdownComponent,
    ModalComponent,
    JumbotronComponent,
    DatosTurnoComponent,
    AlertComponent,
    HighlightPipe,
    FulldatePipe,
    SortByPipe,
    CodigoReservaPipe,
    ShortTimePipe,
    ModalCancelarTurnoComponent,
    LoaderComponent
  ],
  exports: [
    PaginationComponent,
    CountdownComponent,
    ModalComponent,
    JumbotronComponent,
    DatosTurnoComponent,
    AlertComponent,
    SntDatePicker,
    HighlightPipe,
    FulldatePipe,
    SortByPipe,
    CodigoReservaPipe,
    ShortTimePipe,
    ModalCancelarTurnoComponent,
    LoaderComponent
  ]
})
export class SharedModule { }

export { JumbotronComponent, ModalComponent, DatosTurnoComponent, AlertComponent, LoaderModule }
