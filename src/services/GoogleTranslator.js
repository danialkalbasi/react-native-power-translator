import HTTPMethods from './HTTPMethods';
import { GOOGLE } from '../Constants';
import BaseTranslator from './BaseTranslator';
import htmlEntities from './HtmlUtility';

export default class GoogleTranslator extends BaseTranslator {
    config;

    constructor(config) {
      super();
      this.config = config;
    }

    translate(text, lang = '', src_lang = '') {
      if (lang)  this.config.targetLanguage = lang;
      if (src_lang){
         this.config.sourceLanguage = src_lang;
         this.config.source = true;
      }
      else {
          this.config.source = false; 
      }

      const url = `${GOOGLE.TRANSLATE}${this.config.apiKey}`;
      const data = this.createTheRequest(text);

      return HTTPMethods.post(url, data)
        .then(translation => translation.data.translations[0].translatedText)
        .then(htmlEntities);
    }

    createTheRequest(text) {
      const config = this.config;

      const genericObject = {
        q: text,
        target: config.targetLanguage,
      };

      if (config.source) {
        return {
          ...genericObject,
          source: config.sourceLanguage,
        };
      }

      return genericObject;
    }
}
