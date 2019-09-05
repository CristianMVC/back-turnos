import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, Route } from '@angular/router';
import { HttpModule } from '@angular/http';
import { SharedModule, LoaderModule, EncrypterModule, ExpirationModule } from './shared/shared.module';
import { HomeComponent } from './home.component';
import { LayoutModule } from './layout/layout.module';
import { HomeGuard } from './home.guard';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginNavigationComponent } from './login-navigation.component';

const homeRoute: Route = {
  path: '',
  children: [
    { path: 'turnos', loadChildren: 'app/turnos/turnos.module#TurnosModule' },
    { path: 'organismos', loadChildren: 'app/organismos/organismos.module#OrganismosModule' },
    { path: 'calendario', loadChildren: 'app/calendario/calendario.module#CalendarioModule' },
    { path: 'categorias', loadChildren: 'app/categoria-tramites/categoria.module#CategoriaModule' },
    { path: 'etiquetas', loadChildren: 'app/etiqueta-tramites/etiqueta.module#EtiquetaModule' }
  ]
}

const appRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'navigate', component: LoginNavigationComponent },
      { path: 'chooseNavigation', component: LoginNavigationComponent },
      homeRoute
    ],
    canActivate: [ HomeGuard ]
  }
]

@NgModule({
  declarations: [
    HomeComponent,
    LoginNavigationComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    LoaderModule.forRoot(),
    EncrypterModule.forRoot(),
    ExpirationModule.forRoot(),
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    LayoutModule
  ],
  providers: [
    HomeGuard
  ],
  bootstrap: [ HomeComponent ],
  exports: [
    RouterModule
  ]
})
export class HomeModule { }
