import HTTPMethods from './HTTPMethods';
import { MICROSOFT } from '../Constants';
const DOMParser = require('xmldom').DOMParser;

export default class MicrosoftTranslator {
    config;

    constructor(config) {
        this.config = config;
    }

    translate(text) {
        const url = this.createTheRequest(text);
        const header = {
            headers: { 'Ocp-Apim-Subscription-Key': this.config.apiKey }
        };

        return HTTPMethods.get(url, true, header).then(translated => translated.text()).then(xml => {
            return this.xmlToString(xml);
        });
    }

    createTheRequest(text) {
        const config = this.config;

        if (!config.sourceLanguage) {
            return `${MICROSOFT.TRANSLATE}?&to=${config.targetLanguage}&text="${text}"`;
        }
        if(config.sourceLanguage){
            return `${MICROSOFT.TRANSLATE}?source=${config.sourceLanguage}&to=${config.targetLanguage}&text="${text}"`;
        }
    }

    xmlToString(xml) {
        const xmlDoc = new DOMParser().parseFromString(xml, 'text/xml');
        const content = xmlDoc.getElementsByTagName('string')[0]
            .textContent
            .replace('«', '')
            .replace('»', '')
            .trim();

        return content;
    }
}