import {Component} from '@angular/core'

@Component({
  selector: 'app-dynamic-component',
  templateUrl: 'campo-option.component.html'
})

export class DynamicComponent {

  option: string | undefined;
  key: string | undefined;

}
