import { Validation } from 'monet';
import * as R from 'ramda';

export class ValidationError  {

    [key: string]: any

    static of(k: string, v: any) {
        return new ValidationError(k, v)
    }

    static toErrors(validationError: ValidationError): ErrorSNT {
        const object = validationError.toObject();
        const array: string[] = [];
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                array.push(`${key}: ${JSON.stringify(object[key])} `)
            }
        }
        return array;
    }

    constructor(key: string, value: any) {
        this[key] = value
    }


    concat(other: { [key: string]: any }) {
        return Object.assign(this, other)
    }

    toArray() {
        return Object.keys(this).map(key => this[key])
    }

    toObject() {
        return Object.keys(this).reduce((obj: { [key: string]: any }, key: string) => {
            obj[key] = this[key]
            return obj
        }, {})
    }


    toJSON() {
        return this.toObject()
    }
}

export interface PropertyObject { [key: string]: any | PropertyObject }

export interface ValidationResult<T> {
    fails: ValidationError[],
    successes: T[]
}

const includeExpectedKeys = function(element: PropertyObject, expectedKeys: string[]) {
    return R.equals(expectedKeys, R.intersection(R.keys(element), expectedKeys))
}

// tslint:disable-next-line
const validateObject = function<T> (expectedKeys: string[], element: PropertyObject, next: (x: PropertyObject) => T): Validation<ValidationError, T> {
    if (!includeExpectedKeys(element, expectedKeys)) {
        return Validation.fail<ValidationError, T>(ValidationError.of('result', expectedKeys.toString() + ' are required'))
    } else {
        return Validation.success<ValidationError, T>(next(element));
    }
}

// tslint:disable-next-line
const validateObjects = function<T> (expectedKeys: string[], elements: PropertyObject[], f: (x: any) => T): Validation<ValidationError, T>[] {
    return elements.map((element: PropertyObject) => {
        if (!includeExpectedKeys(element, expectedKeys)) {
            // tslint:disable-next-line
            return Validation.fail<ValidationError, T>(ValidationError.of('element', 'element does not match expected keys: ' + expectedKeys.toString()))
        } else {
            return Validation.success<ValidationError, T>(f(element))
        }
    });
}

const createResult = function<T> (validations: Validation<ValidationError, T>[]) {
    // tslint:disable-next-line
    const r: ValidationResult<T> = validations.reduce((acc: ValidationResult<T>, v: Validation<ValidationError, T>) => {
        return v.cata((fail: ValidationError) => {
            return R.assoc('fails', acc.fails.concat([fail]), acc)
        }, (val: T) => {
            return R.assoc('successes', acc.successes.concat([val]), acc)
        })
    }, { fails: [], successes: [] });

    if (r.fails.length > 0) {
        return Validation.fail<ValidationError, T[]>(ValidationError.of('fails', r.fails));
    } else {
        return Validation.success<ValidationError, T[]>(r.successes);
    }
}

export const ValidationUtils = { validateObject: validateObject, validateObjects: validateObjects, createResult: createResult }
