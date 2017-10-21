import HTTPMethods from './HTTPMethods';
import { GOOGLE } from '../Constants';

export default class GoogleTranslator {
    config;

    constructor(config) {
        this.config = config;
    }

    translate(text) {
        const config = this.config;
        const url = `${GOOGLE.TRANSLATE}${this.config.apiKey}`;
        const data = this.createTheRequest(text);

        return HTTPMethods.post(url, data).then(translation => translation.data.translations[0].translatedText);
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