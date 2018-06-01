import HTTPMethods from './HTTPMethods';
import { MICROSOFT } from '../Constants';
import BaseTranslator from './BaseTranslator';
import htmlEntities from './HtmlUtility';

const DOMParser = require('xmldom').DOMParser;

export default class MicrosoftTranslator extends BaseTranslator {
    config;

    constructor(config) {
      super();
      this.config = config;
    }

    translate(text) {
      const url = this.createTheRequest(text);
      const header = {
        headers: {
          'Ocp-Apim-Subscription-Key': this.config.apiKey,
        },
      };

      return HTTPMethods.get(url, true, header)
        .then(translated => translated.text()).then(xml => this.xmlToString(xml))
        .then(htmlEntities);
    }

    createTheRequest(text) {
      const config = this.config;

      if (!config.sourceLanguage) {
        return `${MICROSOFT.TRANSLATE}?&to=${config.targetLanguage}&text='${text}'`;
      }
      const withSource = `${MICROSOFT.TRANSLATE}?source=${config.sourceLanguage}
      &to=${config.targetLanguage}&text='${text}'`;

      return withSource;
    }

    xmlToString(xml) {
      const xmlDoc = new DOMParser().parseFromString(xml, 'text/xml');
      const content = xmlDoc.getElementsByTagName('string')[0]
        .textContent
        .trim();

      return content;
    }
}
