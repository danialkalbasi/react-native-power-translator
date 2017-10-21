import MicrosoftTranslator from '../MicrosoftTranslator';

describe('MicrosoftTranslator Service', () => {
    let microsoftTranslator;
    let config = {
        providerType: 'Microsoft',
        apiKey: 'SomeKey',
        targetLanguage: 'fr',
        sourceLanguage: ''
    }

    beforeEach(() => {
        microsoftTranslator = new MicrosoftTranslator(config);
    });

    describe('createTheRequest function', () => {
        it('should create the request without source language in url param', () => {
            const request = microsoftTranslator.createTheRequest('Hi Sky', 'fr');
            expect(request).not.toContain('source');
        });

        it('should create the request with source language', () => {
            config.sourceLanguage = 'en';
            const request = microsoftTranslator.createTheRequest('Hi Sky');
            expect(request).toContain('source');
        });
    });
});