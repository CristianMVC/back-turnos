import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['modal.component.scss']
})
export class ModalComponent {
    @Input() showCloseButton: boolean;
    @Input() closeOnBlur: boolean;
    @Input() large = false;

    visible = false;
    visibleAnimate = false;

    constructor() { }

    public show(): void {
        this.visible = true;
        const timeout = 50;
        setTimeout(() => this.visibleAnimate = true, timeout);
    }

    public hide(): void {
        this.visibleAnimate = false;
        const timeout = 50;
        setTimeout(() => this.visible = false, timeout);
    }

    public onContainerClicked(event: MouseEvent): void {
        if (this.closeOnBlur && (<HTMLElement>event.target).classList.contains('modal')) {
            this.hide();
        }
    }
}
