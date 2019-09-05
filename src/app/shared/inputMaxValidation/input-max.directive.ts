import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputMax]'
})
export class InputMaxDirective {

    private element: HTMLInputElement;

    constructor(private el: ElementRef) {
        this.element = this.el.nativeElement;
    }

    @HostListener('keydown', ['$event'])
    @HostListener('keyup', ['$event'])
    onKeyPress(event: KeyboardEvent) {
        const keyCodeDelete = 46;
        const keyCodeTab = 8;
        if (+this.element.value > +this.element.max && event.keyCode !== keyCodeDelete && event.keyCode !== keyCodeTab) {
            event.preventDefault();
            this.element.value = this.element.max;
            this.element.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }


}
