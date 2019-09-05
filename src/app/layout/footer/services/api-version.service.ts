import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';

@Injectable()
export class ApiVersionService {

    constructor(private http: Http) { }

    getVersion(): Observable<string> {
        return this.http.get(environment.endpoint.SNTAPI + 'version').map((response: Response) => {
            return response.json().result.version;
        });
    }
}
