'strict_mode';

import { Text, View } from 'react-native';
import React from 'react';
import PowerTranslator from '../PowerTranslator';
const ReactTestRenderer = require('react-test-renderer');

describe('PowerTranslator Component', () => {
    let powerTranslatorComponent;
    let powerTranslatorComponentInstance;
    const textValue = 'A text to translate';

    beforeEach(() => {
        powerTranslatorComponent = ReactTestRenderer.create(<PowerTranslator
            text={textValue}
            style={{ color: '#ccc' }} />);

        powerTranslatorComponentInstance = powerTranslatorComponent.getInstance();
    });

    describe('Rendering', () => {
        it('should create the PowerTranslator component', () => {
            expect(powerTranslatorComponent.toJSON()).toMatchSnapshot();
        });

        it('should return the translation as the original text', () => {
            expect(powerTranslatorComponentInstance.state.translatedText).toBe(textValue);
        });

        it('should onTranslationStart function has default prop value', () => {
            expect(powerTranslatorComponentInstance.props.onTranslationStart).toBeTruthy();
        });

        it('should onTranslationEnd function has default prop value', () => {
            expect(powerTranslatorComponentInstance.props.onTranslationEnd).toBeTruthy();
        });
    });
});