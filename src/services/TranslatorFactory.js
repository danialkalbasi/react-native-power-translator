import GoogleTranslator from './GoogleTranslator';
import MicrosoftTranslator from './MicrosoftTranslator';
import ProviderTypes from '../ProviderTypes';
import TranslatorConfiguration from './TranslatorConfiguration';

/**
 * The TranslatorFactory service
 * A factory class that choose the suitable translator based on the choosen provider
 * The providers constant are available @Constants.js
 */
export default class TranslatorFactory {
  /**
     * This function get the provider and instantiate the right translator class
     * @returns a translater instance based on the configuration class
     */
  static createTranslator() {
    const config = TranslatorConfiguration.getConfig();
    let translator;

    if (config.providerName === ProviderTypes.Google) {
      translator = new GoogleTranslator(config);
    }

    if (config.providerName === ProviderTypes.Microsoft) {
      translator = new MicrosoftTranslator(config);
    }

    return translator;
  }
}
