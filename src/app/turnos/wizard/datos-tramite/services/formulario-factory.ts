import * as R from 'ramda';

export class FormularioFactory {

    static create(response: any): Formulario {
        const tramiteFields = response.result.campos.map((field: any) => {
            return field
        })
        return { fields: tramiteFields };
    }

    static hasMandatoryPrimaryFields(response: any) {
        if (R.not(R.contains('result', R.keys(response)))) {
            throw new TypeError('object doesnt match expected keys: ' + 'result');
        } else {
            if (R.not(R.equals(['id', 'campos'], R.keys(response.result)))) {
                throw new TypeError('object doesnt match expected keys: ' + ['id', 'campos'].toString());
            } else {
                return true;
            }
        }
    }

    static textboxValid(field: any) {
        const expectedKeys = ['key', 'label', 'description', 'formComponent', 'type', 'order', 'required']
        if (R.not(R.equals(expectedKeys, R.keys(field)))) {
            throw new TypeError('object doesnt match expected keys: ' + expectedKeys);
        } else {
            if (R.isNil(field.key) || R.isNil(field.label) || R.isNil(field.formComponent) || R.isNil(field.type ||
                R.isNil(field.order) || R.isNil(field.required))) {
                throw new TypeError('unexpected undefined value');
            } else {
                if (R.isEmpty(field.key) || R.isNil(field.label) || R.isNil(field.type)) {
                    throw new TypeError('unexpected empty string');
                } else {
                    if (R.not(R.has('typeValue')(field.formComponent))) {
                        throw new TypeError('typeValue missing');
                    } else {
                        if (!R.equals(field.formComponent.typeValue, 'text') || !R.equals(field.formComponent.typeValue, 'number')) {
                            throw new TypeError('typeValue mismatch');
                        } else {
                            return true;
                        }
                    }
                }
            }
        }
    }
}
