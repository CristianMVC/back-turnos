import { Component, ElementRef } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import * as R from 'ramda';


@Component({
    selector: 'app-validation-messages',
    templateUrl: 'validation-messages.component.html'
})
export class ValidationMessagesComponent {

    private controlName: string;

    constructor(public form: FormGroupDirective, elementRef: ElementRef) {
        this.controlName = elementRef.nativeElement.previousElementSibling.getAttribute('formControlName')
    }

    getKeyErrors() {
        const control = this.getControl();
        if (control) {
            return R.keys(control.errors);
        } else {
            return [];
        }
    }

    isInvalid() {
        const control = this.getControl();
        return this.form.submitted && control && control.invalid;
    }

    private getControl() {
        return this.form.control.get(this.controlName);
    }
}
