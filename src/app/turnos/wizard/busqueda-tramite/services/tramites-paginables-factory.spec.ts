import * as jsc from '../../../../../../node_modules/jsverify';
import { TramitePaginablesFactory } from './tramite-paginables-factory';
import * as R from 'ramda';
import { JscHelper } from '../../../shared/testing/jsc-utilities';

/* eslint-disable */
describe('TramiteFactory', () => {

  it('should be complete', () => {
    const generator = jsc.record({
      metadata: jsc.record(
        { resultset: jsc.record({ count: jsc.nat }) }),
      result: jsc.nearray(jsc.record({ id: jsc.nat, nombre: jsc.string, area: jsc.string, organismo: jsc.string }))
    });

    expect(jsc.checkForall(generator, (response: any) => {
      const validation = TramitePaginablesFactory.create(response);
      const resultPaginables = validation.success();
      return validation.isSuccess() && R.equals(resultPaginables.tramites, response.result) &&
        resultPaginables.size === response.metadata.resultset.count;
    })).toBeTruthy();
  });

  it('should be throw an error if the response does not match the expectation', () => {
    const recordGen = jsc.record({
      metadata: jsc.record(
        { resultset: jsc.record({ count: jsc.nat }) }),
      result: jsc.nearray(jsc.record({ id: jsc.nat, nombre: jsc.string, area: jsc.string, organismo: jsc.string }))
    });

    const maxNatNumbers = 30;
    expect(jsc.checkForall(recordGen, jsc.nat(maxNatNumbers), (response: any, keyNumberToRemove: number) => {
      const validation = TramitePaginablesFactory.create(JscHelper.removeKeyFromObject(response, keyNumberToRemove));
      return validation.isFail();
    })).toBeTruthy();
  });

});




