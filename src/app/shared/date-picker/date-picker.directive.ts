import {
    Directive,
    ElementRef,
    Renderer,
    Input,
    OnInit,
    OnChanges,
    EventEmitter,
    Output,
    SimpleChanges
} from '@angular/core';
import { ChangeEventObject, SetOptions, Datetimepicker, UpdateEventObject } from 'eonasdan-bootstrap-datetimepicker';
import * as moment from 'moment';

interface DatetimepickerSNT extends Datetimepicker {
    [propName: string]: any;
}

@Directive({
    selector: '[appSntDatePicker]'
})
export class DateTimePickerDirective implements OnInit, OnChanges  {

    @Input() date: moment.Moment;
    @Input() options: SetOptions;

    @Output() onChange: EventEmitter<moment.Moment> = new EventEmitter<moment.Moment>();
    @Output() onUpdate: EventEmitter<moment.Moment> = new EventEmitter<moment.Moment>();
    @Output() onClick: EventEmitter<moment.Moment> = new EventEmitter<moment.Moment>();

    private dpElement: JQuery;

    constructor(el: ElementRef, renderer: Renderer) {
        const $parent = $(el.nativeElement.parentNode) as JQuery;
        this.dpElement = $parent.hasClass('input-group') ? $parent : $(el.nativeElement);
    }

    ngOnInit(): void {
        this.date = moment();
        this.dpElement.datetimepicker(this.options);
        this.dpElement.data('DateTimePicker').date(this.date);

        this.dpElement.on('dp.change', (e: ChangeEventObject) => {
            if (e.date !== this.date) {
                this.date = e.date;
                this.onChange.emit(e.date);
            }
        });

        this.dpElement.on('dp.update', (e: UpdateEventObject) => {
            this.onUpdate.emit(e.viewDate);
        });

        this.dpElement.on('click', () => this.onClick.emit());
    }

    ngOnChanges(changes: SimpleChanges): void {
        const dpe: DatetimepickerSNT = this.dpElement.data('DateTimePicker');

        if (!!dpe) {
            if (changes['options']) {
                $.map(changes['options'].currentValue, (value, key) => {
                    dpe[key](value);
                });
            }

            if (changes['date'] && changes['date'].currentValue !== undefined) {
                dpe.date(changes['date'].currentValue);
            }
        }
    }
}

