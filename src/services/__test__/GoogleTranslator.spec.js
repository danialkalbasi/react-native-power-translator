import GoogleTranslator from '../GoogleTranslator';

describe('GoogleTranslator Service', () => {
    let googleTranslator;
    let config = {
        providerType: 'Google',
        apiKey: 'SomeKey',
        targetLanguage: 'fr',
        sourceLanguage: ''
    }

    beforeEach(() => {
        googleTranslator = new GoogleTranslator(config);
    });

    describe('createTheRequest function', () => {
        it('should create the request without source language', () => {
            const request = googleTranslator.createTheRequest('Hi Sky');
            expect(request.sourceLanguage).toBeUndefined();
        });

        it('should create the request with source language', () => {
            googleTranslator.config.source = 'en';
            const request = googleTranslator.createTheRequest('Hi Sky');
            expect(request.source).toBeDefined();
        });
    });
});