import { Component } from '@angular/core';
import * as moment from 'moment';
import { SessionService } from './shared/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  title = 'app';
  isReady: boolean;

  constructor(private sessionService: SessionService) {
    moment.locale('es');
    this.sessionService.getMessage().subscribe(() => this.isReady = true)
  }
}
