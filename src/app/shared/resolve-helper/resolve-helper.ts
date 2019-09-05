import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Either } from 'monet';

export type ResolveValue<T> = Resolve<ResolveValueStream<T | null>>;
export type ResolveValueStream<T> = Observable<T | null>;

export function handleResolveData<T, U>(observable: Observable<T>, defaultValue: T | null = null): ResolveValueStream<T> {
    return observable
        .map((value: T) => value)
        .catch((error: U) => {
            console.log('Error en resolve: ', error);
            return Observable.of(defaultValue);
        });
}

export function handleResolveDataEither<E, T>(eitherObservable: Observable<Either<E, T>>,
     defaultValue: T | null = null): ResolveValueStream<T> {
    return eitherObservable.switchMap<Either<E, T>, T | null>(either => either.cata(err => {
        console.log('Error en resolve: ', err);
        return Observable.of(defaultValue);
    }, value => Observable.of(value)))
}
