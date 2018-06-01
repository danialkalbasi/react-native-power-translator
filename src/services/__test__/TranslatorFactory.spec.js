import TranslatorFactory from '../TranslatorFactory';
import ProviderTypes from '../../ProviderTypes';
import GoogleTranslator from '../GoogleTranslator';
import MicrosoftTranslator from '../MicrosoftTranslator';
import * as sinon from 'sinon';
import TranslatorConfiguration from '../TranslatorConfiguration';

describe('TranslatorFactory Service', () => {
    const configObject = {
        providerName: ProviderTypes.Google,
        apiKey: 'SOME_KEY',
        targetLanguage: 'fr',
        sourceLanguage: false,
    };
    const MicrosoftTranslatorStub = sinon.stub(MicrosoftTranslator.prototype, 'translate')
        .callsFake(() => { return new Promise.resolve('Microsoft') });
    const GoogleTranslatorStub = sinon.stub(GoogleTranslator.prototype, 'translate')
        .callsFake(() => { return new Promise.resolve('Google') });

    beforeEach(() => {
        TranslatorConfiguration.setConfig(ProviderTypes.Google, 'SOME_KEY', 'fr');
    });

    describe('createTranslator function', () => {
        it('should create a GoogleTranslator if the provider type is `Google`', () => {
            // Act
            const translator = TranslatorFactory.createTranslator();

            // Assert
            translator.translate('some text').then(translated => {
                expect(translated).toBe('Google')
                expect(GoogleTranslatorStub.called).toBeTruthy();
            });

        });

        it('should create an return `Microsoft` as a translation and call the MicrosoftTranslator translate function', () => {
            // Act
            TranslatorConfiguration.setConfig(ProviderTypes.Microsoft, 'SOME_KEY', 'fr');
            const translator = TranslatorFactory.createTranslator();

            // Assert
            translator.translate('some text').then(translated => {
                expect(translated).toBe('Microsoft');
                expect(MicrosoftTranslatorStub.called).toBeTruthy();
            });
        });
    });
});