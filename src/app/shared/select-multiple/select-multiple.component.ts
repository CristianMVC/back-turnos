import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import * as R from 'ramda';

@Component({
    selector: 'app-select-multiple',
    templateUrl: './select-multiple.component.html',
    styleUrls: ['select-multiple.component.scss']
})
export class SelectMultipleComponent implements OnInit, OnChanges {
    @Input() etiqueta: boolean;
    @Input() optionsList: any[];
    @Input() selectedList: any[];
    @Input() optionsLabel: string;
    @Input() placeholder: string;
    @Input() required: boolean;

    selectedOption: any;
    availableOptionsList: any[];

    constructor(public form: FormGroupDirective) { }

    ngOnInit() {
        this.selectedOption = null;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.optionsList && changes.optionsList.currentValue && this.selectedList) {
            this.availableOptionsList = R.differenceWith(this.equals, changes.optionsList.currentValue, this.selectedList);
        }
    }

    equals(item1: any, item2: any): boolean {
        return (item1 && item2 && item1.id === item2.id);
    }

    onAddClicked() {
        if (this.selectedOption) {
            const index = R.findIndex(R.propEq('id', this.selectedOption.id))(this.availableOptionsList);

            if (index > -1) {
                this.availableOptionsList.splice(index, 1);
                this.selectedList.push(this.selectedOption);
            }
            this.selectedOption = null;
        }
    }

    onRemoveClicked(item: any) {
        const index = R.findIndex(R.propEq('id', item.id))(this.selectedList);
        if (index > -1) {
            this.selectedList.splice(index, 1);
            this.availableOptionsList.push(item);
        }
    }

    addBtnDisabled(): boolean {
        return this.selectedOption === null;
    }

    isRequired() {
        return R.not(R.isNil(this.required));
    }

    hasError() {
        return this.form.submitted && this.isRequired() && R.isEmpty(this.selectedList);
    }
}
