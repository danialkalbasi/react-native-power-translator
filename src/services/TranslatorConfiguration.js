import ProviderTypes from '../ProviderTypes';

class TranslatorConfiguration {
    config = {};

    /**
     * Set the translator configuration
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
        providerName,
        apiKey,
        targetLanguage,
        sourceLanguage,
      };
    }

    /**
     * Get and return the config
     */
    getConfig() {
      return this.config;
    }
}

export default new TranslatorConfiguration();
