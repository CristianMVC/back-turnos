import {NgModule} from '@angular/core';
import { DateTimePickerDirective } from './date-picker.directive';

@NgModule({
    declarations: [
        DateTimePickerDirective
    ],
    exports: [DateTimePickerDirective]
})

export class SntDatePicker {
}
