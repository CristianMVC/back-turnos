import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpSNT } from '../../../shared/services/http-snt';
import { OrganismosPaginablesImpl } from './models/organismos-paginables'

@Injectable()
export class OrganismosService {
    private limit = 10;

    constructor(private http: HttpSNT) { }

    getOrganismos(offset = 0): Observable<OrganismosPaginables> {
       return this._getOrganismos(offset, this.limit);
    }

    getAllOrganismos(): Observable<Organismo[]> {
        const offset = 0;
        const limit = 100; // TODO revisar cuantos organismos
        return this._getOrganismos(offset, limit).map((organismosPaginables: OrganismosPaginables) => {
            return organismosPaginables.organismos;
        });
    }

    getAllOrganismosArea(): Observable<OrganismoAreas[]> {
        return this.getAllOrganismos().map<Organismo[], OrganismoAreas[]>((organismos: Organismo[]) => {
            return organismos.map<OrganismoAreas>((organismo: Organismo) => {
                return {
                    id: organismo.id,
                    nombre: organismo.nombre,
                    areas: undefined
                }
            })
        });
    }

    getLimit() {
        return this.limit;
    }

    private _getOrganismos(offset: number, limit: number) {
        return this.http.get<Organismo[]>('organismos', {
            offset: offset,
            limit: limit
        }).map((response: BackOfficeResponse<Organismo[]>) => {
            return new OrganismosPaginablesImpl(response);
        });
    }
}
