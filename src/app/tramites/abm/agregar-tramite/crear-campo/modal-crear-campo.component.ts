import { Component, ViewChild, OnInit, AfterViewInit, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { ModalComponent } from '../../../../shared/modal/modal.component';
import { AddDynamicComponentService } from './campo-option/services/add-dynamic-component.service';

import * as R from 'ramda';

@Component({
    selector: 'app-modal-crear-campo',
    templateUrl: 'modal-crear-campo.component.html',
    styleUrls: ['modal-crear-campo.component.scss']
})

export class ModalCrearCampoComponent implements OnInit, AfterViewInit {
    @Output() tramiteFieldCreatedEvent: EventEmitter<TramiteField> = new EventEmitter<TramiteField>()

    @ViewChild(ModalComponent)
    private modalComponent: ModalComponent;

    @ViewChild('dynamicComponent', { read: ViewContainerRef })
    private viewContainerRef: ViewContainerRef;

    optionsMandatory: boolean;

    crearCampoForm: FormGroup;

    componentTypes: FormComponentType[] = ['textbox', 'dropdown', 'textarea', 'radio', 'date']; // tslint:disable-line
    private fieldTypes: TramiteFieldType[] = ['text', 'number']; // tslint:disable-line

    field: TramiteField = {} as TramiteField;
    private fieldType: string;

    constructor(private addDynamicComponentService: AddDynamicComponentService) {
    }

    ngAfterViewInit(): void {
        this.addDynamicComponentService.setRootViewContainerRef(this.viewContainerRef);
    }

    ngOnInit() {
        this.crearCampoForm = new FormGroup({
            label: new FormControl('', [Validators.required]),
            description: new FormControl('', []),
            required: new FormControl('', []),
            type: new FormControl('', [Validators.required]),
            fieldType: new FormControl('', [])
        });
    }

    show() {
        this.field = {} as TramiteField;
        this.addDynamicComponentService.resetOptions();
        this.crearCampoForm.reset();
        this.modalComponent.show();
    }

    hide() {
        this.modalComponent.hide();
    }

    cancelar() {
        this.hide();
    }

    fieldWithOptions() {
        return R.not(R.isEmpty(this.field.type)) && (R.equals(this.field.type, 'dropdown') || R.equals(this.field.type, 'radio'));
    }

    fieldWithType() {
        return R.not(R.isEmpty(this.field.type)) && R.equals(this.field.type, 'textbox');
    }

    crearCampo() {
        if (this.crearCampoForm.valid) {
            if (this.fieldWithType()) {
                this.field.formComponent = { typeValue: this.fieldType } as FormComponent;
            } else if (this.fieldWithOptions()) {
                this.field.formComponent = { options: [] } as FormComponent;
                const options = this.addDynamicComponentService.getOptions();
                if ((options.length === 0)) {
                    this.optionsMandatory = true;
                } else {
                    this.optionsMandatory = false;
                    options.forEach((option, index: number) => {

                        if(option.key === undefined) {
                            option.key = 'option_' + index;
                        }

                        (this.field.formComponent as any).options.push({ key: option.key, value: option.option });
                    });
                }
            }
            this.addKeyToField();
            this.tramiteFieldCreatedEvent.emit(R.clone(this.field));
            this.cancelar();
        }
    }

    addOption(value?: string | undefined, key?: string | undefined) {
        this.addDynamicComponentService.addDynamicComponent(value, key);
    }

    onFieldTypeChange() {
        this.field.formComponent = {
            typeValue: this.fieldType
        } as FormComponent;
    }

    onComponentTypeChange() {
        if (this.fieldWithType()) {
            this.setFieldTypeValidator(Validators.required);
        } else {
            this.setFieldTypeValidator(null);
        }
    }

    addKeyToField() {
        this.field.key = this.field.label.toLowerCase().replace(/(?:(^.)|(\s+.))/g, (match) => {
            return match.charAt(match.length - 1).toUpperCase();
        })
    }

    private setFieldTypeValidator(validator: ValidatorFn | ValidatorFn[] | null) {
        this.crearCampoForm.controls['fieldType'].setValidators(validator);
        this.crearCampoForm.controls['fieldType'].updateValueAndValidity();
    }

    readFile(files: FileList) {
        if (files && files.length > 0) {
            const file: File = files.item(0);
            const reader: FileReader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                const csv: string = reader.result;
                csv.split('\n').map(row => {
                    if (row !== '') {
                        const r: string[] = row.split(',');
                        this.addOption(r[1], r[0])
                    }
                })
            }
        }
    }
}
