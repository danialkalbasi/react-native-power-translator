import Translation from '../Translation';
import ProviderTypes from '../../ProviderTypes';
import GoogleTranslator from '../GoogleTranslator';
import MicrosoftTranslator from '../MicrosoftTranslator';
import * as sinon from 'sinon';

describe('Translation Service', () => {
    const configObject = {
        providerName: ProviderTypes.Google,
        apiKey: 'SOME_KEY',
        targetLanguage: 'fr',
        sourceLanguage: false,
    };
    const MicrosoftTranslatorStub = sinon.stub(MicrosoftTranslator.prototype, 'translate')
        .callsFake(() => { return 'Microsoft' });
    const GoogleTranslatorStub = sinon.stub(GoogleTranslator.prototype, 'translate')
        .callsFake(() => { return 'Google' });

    beforeEach(() => {
        Translation.setConfig(ProviderTypes.Google, 'SOME_KEY', 'fr');
    });

    describe('setConfig function', () => {
        beforeEach(() => {
            Translation.setConfig(ProviderTypes.Google, 'SOME_KEY', 'fr');
        });

        it('should set all the config values', () => {
            // Act 
            const getConfig = Translation.getConfig();

            // Assert
            expect(getConfig).toEqual(configObject);
        });

        it('should throw an error if the provider name or api key is not set', () => {
            // Assert
            expect(() => { Translation.setConfig('', 'SOME_KEY', 'fr') })
                .toThrow(new Error('Please set the provider name and its API key'));
        });

        it('should throw an error if the target language is not set', () => {
            // Assert
            expect(() => { Translation.setConfig(ProviderTypes.Microsoft, 'SOME_KEY', '') })
                .toThrow(new Error('Please set the target language'));
        });

        it('should throw an error if the provider name is not valid', () => {
            // Assert
            expect(() => { Translation.setConfig('invalid language', 'SOME_KEY', 'fr') })
                .toThrow(new Error('The provider type is not valid!'));
        });
    });

    describe('getConfig function', () => {
        it('should return the config', () => {
            // Act
            const getConfig = Translation.getConfig();

            // Assert
            expect(getConfig).toEqual(configObject);
        });
    });

    describe('translate function', () => {
        it('should create an return `Google` as a translation and call the GoogleTranslator translate function', () => {
            // Act
            const result = Translation.get('Text');

            // Assert
            expect(result).toBe('Google');
            expect(GoogleTranslatorStub.called).toBeTruthy();
        });

        it('should create an return `Microsoft` as a translation and call the MicrosoftTranslator translate function', () => {
            // Act
            Translation.setConfig(ProviderTypes.Microsoft, 'SOME_KEY', 'fr');
            const result = Translation.get('Text');

            // Assert
            expect(result).toBe('Microsoft');
            expect(MicrosoftTranslatorStub.called).toBeTruthy();
        });
    });
});