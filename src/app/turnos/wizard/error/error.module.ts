import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ErrorComponent } from './error.component';

const appRoutes: Routes = [
    { path: 'error', component: ErrorComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
        SharedModule
    ],
    declarations: [
        ErrorComponent
    ],
    exports: [RouterModule]
})
export class ErrorModule { }
