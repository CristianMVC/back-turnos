import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['toggle.component.scss']
})
export class ToggleComponent {
    @Input() onText: string;
    @Input() offText: string;
    @Input() model: number;
    @Input() disabled: boolean;

    @Output() modelChange = new EventEmitter<number>();

    onEstadoChange(event: ToggleEvent) {
        this.modelChange.emit(event.currentValue ? 1 : 0);
    }

}
