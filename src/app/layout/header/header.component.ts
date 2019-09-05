import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../shared/services/session.service';
import { environment } from '../../../environments/environment';
import { LogoutService } from '../../shared/services/logout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  nombreYApellido: string | null;
  data: string;

  constructor(
    private sessionService: SessionService,
    private logoutService: LogoutService
  ) { }

  ngOnInit() {
      this.data = this.sessionService.getLoggedInData();
      this.nombreYApellido = this.sessionService.getNombreYApellido();
  }

  logout() {
    this.logoutService.cleanSession().subscribe(() => {
      this.sessionService.clear();
      window.location.href = environment.endpoint.Usuarios;
    }) ;
  }

  goToUsuarios() {
    return window.location.href = environment.endpoint.Usuarios + 'home/usuarios';
  }

  goToAgentes() {
    return window.location.href = environment.endpoint.SNC + 'navigate?destino=agentes&data=' + this.data;
  }

  goToRecepcion() {
    return window.location.href = environment.endpoint.SNC + 'navigate?destino=turnos&data=' + this.data;
  }

  goToColas() {
    return window.location.href = environment.endpoint.SNC + 'navigate?destino=colas&data=' + this.data;
  }

  goToVentanillas() {
    return window.location.href = environment.endpoint.SNC + 'navigate?destino=ventanillas&data=' + this.data;
  }

  goToVerCarteleras() {
    return window.open(environment.endpoint.Carteleras + 'navigate?destino=carteleras&data=' + this.data, '_blank');
  }

  goToCarteleras() {
    return window.location.href = environment.endpoint.SNC + 'navigate?destino=carteleras&data=' + this.data;
  }

  goToTod() {
    return window.open(environment.endpoint.TOD + 'navigate?destino=bienvenida&data=' + this.data, '_blank');
  }

  goToCambiarPassword() {
    return window.location.href = environment.endpoint.Usuarios + 'home/cambiar-password';
  }

  isAdministrarActive() {
    return window.location.pathname.indexOf('calendario') < 0;
  }

  goToCategorias() {
    return window.location.href  = 'categorias';
  }

  goToEtiquetas() {
    return window.location.href  = 'etiquetas';
  }

}
