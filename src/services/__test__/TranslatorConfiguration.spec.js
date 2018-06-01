import TranslatorConfiguration from '../TranslatorConfiguration';
import ProviderTypes from '../../ProviderTypes';
import * as sinon from 'sinon';

describe('TranslatorConfiguration Service', () => {
    const configObject = {
        providerName: ProviderTypes.Google,
        apiKey: 'SOME_KEY',
        targetLanguage: 'fr',
        sourceLanguage: false,
    };

    beforeEach(() => {
        TranslatorConfiguration.setConfig(ProviderTypes.Google, 'SOME_KEY', 'fr');
    });

    describe('setConfig function', () => {
        beforeEach(() => {
            TranslatorConfiguration.setConfig(ProviderTypes.Google, 'SOME_KEY', 'fr');
        });

        it('should set all the config values', () => {
            // Act 
            const getConfig = TranslatorConfiguration.getConfig();

            // Assert
            expect(getConfig).toEqual(configObject);
        });

        it('should throw an error if the provider name or api key is not set', () => {
            // Assert
            expect(() => { TranslatorConfiguration.setConfig('', 'SOME_KEY', 'fr') })
                .toThrow(new Error('Please set the provider name and its API key'));
        });

        it('should throw an error if the target language is not set', () => {
            // Assert
            expect(() => { TranslatorConfiguration.setConfig(ProviderTypes.Microsoft, 'SOME_KEY', '') })
                .toThrow(new Error('Please set the target language'));
        });

        it('should throw an error if the provider name is not valid', () => {
            // Assert
            expect(() => { TranslatorConfiguration.setConfig('invalid language', 'SOME_KEY', 'fr') })
                .toThrow(new Error('The provider type is not valid!'));
        });
    });

    describe('getConfig function', () => {
        it('should return the config', () => {
            // Act
            const getConfig = TranslatorConfiguration.getConfig();

            // Assert
            expect(getConfig).toEqual(configObject);
        });
    });
});