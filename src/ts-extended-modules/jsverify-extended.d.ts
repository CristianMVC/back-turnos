import * as jsc from 'jsverify';

declare module 'jsverify' {

    export function record<T>(arb: any): any;
    function oneof<T>(gs: Arbitrary<T>[]): Arbitrary<T>;

}