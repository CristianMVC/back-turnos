import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment';
import { SessionService } from './session.service';
import { LoaderService } from './loader.service';
import { ErrorFactory } from './error.factory';
import { ExpirationService } from '../expiration/expiration.module';
import { ValidationError } from '../validations/validations';
import { Validation, Either } from 'monet';
import { EitherObservable } from './eitherObservable';


interface Params {
    [key: string]: any;
}

@Injectable()
export class HttpSNT {

    private envs: { [key: string]: string } = {
        'usuarios': environment.endpoint.UsuariosAPI
    }

    constructor(
        private http: Http,
        private sessionService: SessionService,
        private loaderService: LoaderService,
        private expirationService: ExpirationService) { }

    private getHeaders(params?: Params) {
        const headers = new Headers({ 'Authorization': 'Bearer ' + this.sessionService.getToken(), 'Content-Type': 'application/json' });
        return params ? new RequestOptions({headers: headers, params: params}) : new RequestOptions({headers: headers});
    }
    private getParams(params: Params) {
        const urlSearchParams = new URLSearchParams();
        for (const key of Object.keys(params)) {
            const value = params[key];
            urlSearchParams.set(key, value);
        }
        return urlSearchParams;
    }

    getTransformer<T>(url: string, create: (r: BackOfficeResponse<T>) => Validation<ValidationError, T>, params?: Params) {
        const get = this.get<T>(url, params)
                    .map((value: BackOfficeResponse<T>) => create(value).toEither().leftMap(error => ValidationError.toErrors(error)))
                    .catch((error: ErrorSNT) => Observable.of(Either.Left<ErrorSNT, T>(error)));
        return new EitherObservable<ErrorSNT, T>(get);
    }

    get<T>(url: string, params?: Params): Observable<BackOfficeResponse<T> | ErrorSNT> {
        this.loaderService.show();
        const options = params ? this.getHeaders(this.getParams(params)) : this.getHeaders();
        return this.http.get(environment.endpoint.SNTAPI + url, options).map((response: Response) => {
            this.loaderService.hide();
            return <BackOfficeResponse<T>>response.json();
        }).catch(err => {
            this.loaderService.hide();
            this.checkExpiration(err);
            const errores = ErrorFactory.obtenerError(<BackOfficeStatusResponse>err.json());
            return <Observable<ErrorSNT>>Observable.throw(errores);
        })
    }

    post<T>(url: string, payload: T, env?: string): Observable<BackOfficeStatusResponse & ErrorSNT> {
        this.loaderService.show();
        const options = this.getHeaders();
        const envUsed = env ? this.envs[env] : environment.endpoint.SNTAPI;
        return this.http.post(envUsed + url, payload, options).map((response: Response) => {
            this.loaderService.hide();
            return <BackOfficeStatusResponse>response.json();
        }).catch(err => {
            this.loaderService.hide();
            this.checkExpiration(err);
            const errores = ErrorFactory.obtenerError(<BackOfficeStatusResponse>err.json());
            return Observable.throw(errores);
        })
    }

    put<T>(url: string, payload: T): Observable<BackOfficeStatusResponse & ErrorSNT> {
        this.loaderService.show();
        const options = this.getHeaders();
        return this.http.put(environment.endpoint.SNTAPI + url, payload, options).map((response: Response) => {
            this.loaderService.hide();
            return <BackOfficeStatusResponse>response.json();
        }).catch(err => {
            this.loaderService.hide();
            this.checkExpiration(err);
            const errores = ErrorFactory.obtenerError(<BackOfficeStatusResponse>err.json());
            return Observable.throw(errores);
        })
    }

    delete(url: string): Observable<BackOfficeStatusResponse & ErrorSNT> {
        this.loaderService.show();
        const options = this.getHeaders();
        return this.http.delete(environment.endpoint.SNTAPI + url, options).map((response: Response) => {
            this.loaderService.hide();
            return <BackOfficeStatusResponse>response.json();
        }).catch(err => {
            this.loaderService.hide();
            this.checkExpiration(err);
            const errores = ErrorFactory.obtenerError(<BackOfficeStatusResponse>err.json());
            return Observable.throw(errores);
        })
    }

    private checkExpiration(err: any) {
        const forbidden = 403;
        if (err.status && err.status === forbidden) {
            this.expirationService.setExpired(true);
        }
    }

}
