import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidateCuil } from '../validate-cuil';

@Component({
  selector: 'app-dynamic-tramite-form',
  templateUrl: './dynamic-tramite-form.component.html',
  styleUrls: ['./dynamic-tramite-form.component.scss']
})

export class DynamicTramiteFormComponent {
  @Input() field: TramiteField
  @Input() form: FormGroup;
  @Input() submitPressed: boolean

  constructor(private validateCuil: ValidateCuil) {}

  get isInvalid() {
    return this.submitPressed && !this.form.controls[this.field.key].valid;
  }

  get isRequired() {
    const errors = !this.form.controls[this.field.key].errors ? [] :
      Object.keys(this.form.controls[this.field.key].errors);
    return this.submitPressed && errors.length > 0 && errors[0] === 'required';
  }

  get badPattern() {
    const  errors = !this.form.controls[this.field.key].errors ? [] :
      Object.keys(this.form.controls[this.field.key].errors);
    return this.submitPressed && errors.length > 0 && (errors[0] === 'cuil' || errors[0] === 'alfanumerico');
  }

  onKey(event: any, label: string) {
    return this.validateCuil.cuilInput(event, label);
  }

}
