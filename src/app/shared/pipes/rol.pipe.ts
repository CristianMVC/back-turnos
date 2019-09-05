import { PipeTransform, Pipe } from '@angular/core';
import { RolService } from '../services/rol.service';

@Pipe({ name: 'rol' })
export class RolPipe implements PipeTransform {

    constructor(private rolService: RolService) { }

    transform(rol: number): string {
        return this.rolService.getRolString(rol);
    }
}
