import * as jsc from '../../../../../../node_modules/jsverify';
import * as R from 'ramda';
import { FormularioFactory } from './formulario-factory';
import { JscHelper } from '../../../shared/testing/jsc-utilities';

describe('FormularioFactory', () => {

    it('should has id and campos field', () => {
        const generator = jsc.record({
            result: jsc.record({ id: jsc.nat, campos: jsc.constant({}) })
        });

        expect(jsc.checkForall(generator, (response: any) => {
            return FormularioFactory.hasMandatoryPrimaryFields(response);
        })).toBeTruthy();

        // tslint:disable-next-line:no-magic-numbers
        expect(jsc.checkForall(generator, jsc.random(1, 3), (response: any, keyIndexToRemove: number) => {
            try {
                FormularioFactory.hasMandatoryPrimaryFields(JscHelper.removeKeyFromObject(response, keyIndexToRemove));
                return false;
            } catch (error) {
                return true;
            }
        })).toBeTruthy();
    });

    it('input field should be valid', () => {
        const generator1 = jsc.record({
            key: jsc.string,
            label: jsc.string,
            description: jsc.string,
            formComponent: jsc.record({ typeValue: jsc.oneof([jsc.string, jsc.elements(['text', 'number'])]) }),
            type: jsc.constant('textbox'),
            order: jsc.nat,
            required: jsc.bool
        })

        expect(jsc.checkForall(generator1, (response: any) => {
            if (R.isEmpty(response.key) || R.isEmpty(response.label) || R.isEmpty(response.type) ||
                !R.equals(response.formComponent.typeValue, 'text') || !R.equals(response.formComponent.typeValue, 'number')) {
                try {
                    return FormularioFactory.textboxValid(response);
                } catch (error) {
                    return true;
                }
            } else {
                return FormularioFactory.textboxValid(response);
            }

        })).toBeTruthy();

            const generator2 = jsc.record({
            key: jsc.string,
            label: jsc.string,
            description: jsc.string,
            formComponent: jsc.record({ typeValue: jsc.oneof([jsc.string, jsc.elements(['text', 'number'])]) }),
            type: jsc.constant('textbox'),
            order: jsc.nat,
            required: jsc.bool
        })

        // tslint:disable-next-line:no-magic-numbers
        expect(jsc.checkForall(generator2, jsc.random(1, 10), (response: any, keyIndexToRemove: number) => {
           try {
                FormularioFactory.textboxValid(JscHelper.removeKeyFromObject(response, keyIndexToRemove));
                return false;
            } catch (error) {
                return true;
            }
        })).toBeTruthy();


    });

});

