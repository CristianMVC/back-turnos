import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Component({
    selector: 'app-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['switch.component.scss']
})
export class SwitchComponent implements OnChanges, OnInit {
    @Input() disabled?: boolean;
    @Input() required?: boolean;
    @Input() name: string;
    @Input() model: number;
    @Output() modelChange: EventEmitter<number>;

    switchValue: number;
    control: any;

    constructor(public form: FormGroupDirective) {
        this.modelChange = new EventEmitter<number>();
    }

    ngOnInit() {
        this.control = this.form.control.get(this.name);
        this.control.setValue(this.model);
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes.model) {
            this.switchValue = changes.model.currentValue;
        }
    }

    yesBtnClick() {
        this.switchValue = 1;
        this.modelChange.emit(this.switchValue);
        this.control.setValue(this.switchValue);
    }

    noBtnClick() {
        this.switchValue = 0;
        this.modelChange.emit(this.switchValue);
        this.control.setValue(this.switchValue);
    }

    isInvalid() {
        return this.form.submitted && this.required && this.switchValue === undefined ;
    }

}
