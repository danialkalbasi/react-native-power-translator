import GoogleTranslator from './GoogleTranslator';
import MicrosoftTranslator from './MicrosoftTranslator';
import ProviderTypes from '../ProviderTypes';

/**
 * The translation service
 * A factory class that choose the suitable translator based on the choosen provider
 * The providers constant are available @Constants.js
 * This class is Singleton.
 */
class Translation {
    /**
     * Keep the translation configuration
     * It's for internal usage.
     */
    config = {};

    /**
     * 
     * @param providerName is the name of the translation provider
     * @param apiKey can be accessed through the provider dashboard. e.g Google Console
     * @param targetLanguage, to what language translate to. e.g. English
     * @param sourceLanguage, from what language translate to. e.g French
     * If the sourceLanguage is empty, the provider will auto detect the language
     */
    setConfig(providerName, apiKey, targetLanguage, sourceLanguage = false) {
        if (!providerName || !apiKey) {
            throw new Error('Please set the provider name and its API key');
        }

        if (!targetLanguage) {
            throw new Error('Please set the target language');
        }

        if (!ProviderTypes.hasOwnProperty(providerName)) {
            throw new Error('The provider type is not valid!');
        }

        this.config = {
            providerName: providerName,
            apiKey: apiKey,
            targetLanguage: targetLanguage,
            sourceLanguage: sourceLanguage,
        };
    }

    /**
     * Get and return the config
     */
    getConfig() {
        return this.config;
    }
    
    /**
     * This function get the provider and instantiate the right translator class 
     * to translate the text string which passed as a parameter.
     * @param text is the string which needs to get translated.
     * @returns translated text as a promise. 
     * If the provider is not valid, the original text will be returned as a fallback.
     */
    get(text) {
        const config = this.getConfig();

        if (this.config.providerName === ProviderTypes.Google) {
            const googleTranslator = new GoogleTranslator(config);
            return googleTranslator.translate(text);
        }

        if (this.config.providerName === ProviderTypes.Microsoft) {
            const microsoftTranslator = new MicrosoftTranslator(config);
            return microsoftTranslator.translate(text);
        }

        return new Promise((resolve) => { resolve(text) });
    }
}

export default new Translation();