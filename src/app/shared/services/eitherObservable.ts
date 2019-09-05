import { Either } from 'monet';
import { Observable } from 'rxjs/Observable';

export class EitherObservable<E, T> {

    constructor(public value: Observable<Either<E, T>>) { }

    unit<A>(value: A): EitherObservable<E, A> {
        return new EitherObservable(Observable.of(Either.of<E, A>(value)));
    }

    map<A>(trans: EitherObservable<E, T>, f: (a: T) => A ): EitherObservable<E, A> {
        return new EitherObservable(trans.value.map(either => either.map(f)));
    }

    flatMap<A>(trans: EitherObservable<E, T>, f: (a: T) => EitherObservable<E, A>): EitherObservable<E, A> {
        return new EitherObservable<E, A>(trans.value.switchMap(either =>
             either.isRight() ? f(either.right()).value as any : this.unit(either.left() as any)));
    }

    toObservable() {
        return this.value.switchMap<Either<E, T>, T | E>(either =>
             either.isRight() ? Observable.of(either.right()) : Observable.of(either.left()));
    }

}

