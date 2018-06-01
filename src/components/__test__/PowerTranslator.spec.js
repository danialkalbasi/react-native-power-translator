'strict_mode';

import React from 'react';
import * as sinon from 'sinon';
import PowerTranslator from '../PowerTranslator';
import TestRenderer from 'react-test-renderer';
import TranslatorFactory from '../../services/TranslatorFactory';

class GoogleTranslatorMock {
    translate() {
        return Promise.resolve();
    }
}

describe('PowerTranslator Component', () => {
    let powerTranslatorComponent;
    let powerTranslatorComponentInstance;
    const textValue = 'A text to translate';

    const TranslatorFactoryStub = sinon.stub(TranslatorFactory, 'createTranslator')
        .callsFake(() => { return new GoogleTranslatorMock()});

    beforeEach(() => {
        powerTranslatorComponent = TestRenderer.create(<PowerTranslator
            text={textValue}
            style={{ color: '#ccc' }} />);

        powerTranslatorComponentInstance = powerTranslatorComponent.getInstance();
        console.log(powerTranslatorComponentInstance)
    });

    describe('Rendering', () => {
        it('should create the PowerTranslator component', () => {
            expect(powerTranslatorComponent.toJSON()).toMatchSnapshot();
        });

        it('should onTranslationStart function has default prop value', () => {
            expect(powerTranslatorComponentInstance.props.onTranslationStart).toBeTruthy();
        });

        it('should onTranslationEnd function has default prop value', () => {
            expect(powerTranslatorComponentInstance.props.onTranslationEnd).toBeTruthy();
        });
    });
});