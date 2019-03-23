## Power Translator - A simple way to use cloud translation services
PowerTranslator gives you a no-hassle way to use Google and Microsoft cloud translation services in react native.

![Power Translator Demo](https://github.com/danialkalbasi/react-native-power-translator/blob/master/power-translator-demo.gif)

An example of how to use it: [Download Demo](https://gist.github.com/danialkalbasi/350d960a6d28016a3331f6a9c7baefa4)

### Install
```
npm i react-native-power-translator --save
```
### 1. Import module
```
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
```

### 2. Set PowerTranslator configuration
```
TranslatorConfiguration.setConfig('Provider_Type', 'Your_API_Key','Target_Language', 'Source_Language');

// Example
TranslatorConfiguration.setConfig(ProviderTypes.Google, 'xxxx','fr');
```
Note: The source of the language is optional, if you are not specify it, the provider will detect the language for you.

### 3. Add translation
There are a couple of ways to use this module based on different use case.

**Use it as a component**
```
<PowerTranslator text={'Engineering physics or engineering science refers to the study of the combined disciplines of physics'} />
```

**Use it as a service/class**
The return value will be a promise that returns translated text.
```
const translator = TranslatorFactory.createTranslator();
translator.translate('Engineering physics or engineering science').then(translated => {
    //Do something with the translated text
});
```
You can also pass in an optional language parameter to translate to desire languagues (default use current config)
```
const translator = TranslatorFactory.createTranslator();
translator.translate('Engineering physics or engineering science', 'fr').then(translated => {
    //Do something with the translated text which would be in French
});
```

You can specify optional source language (otherwise it autodetects) 

```
const translator = TranslatorFactory.createTranslator();
translator.translate('chair', 'en', 'fr').then(translated => {
    //Chair has different meaning in French/English
});
```


## Complete reference
* **PowerTranslator**: A react component to translate your texts.
* **ProviderTypes**: List of the cloud provider types. There are two providers is available. ProvierTypes.Google for [google translate](https://cloud.google.com/translate/docs/) and ProviderTypes.Microsoft for [microsoft translator text](https://azure.microsoft.com/en-us/services/cognitive-services/translator-text-api/) cloud service.
* **TranslatorFactory**: It creates a suitable translator instance, based on your configuration.
* **TranslatorConfiguration**: It initializes and keeps the translator configuration.

## Props list
Here is the list of props: 
* **text**: The text you need to translate. Required.
* **onTranslationStart**: Get triggered when the text translation gets started.
* **onTranslationEnd**: Get triggered when the text translation ends.
* **style**: Styles for translated text. All the react native Text styles props are valid.

## Inspiration on how to use it
A few use cases that is possible to cover with this module.
* **As a fallback translation**: In case your primary translation service/library failed for some reason. It is possible to use the cloud service next to your translation service/library as a fallback.
* **As a quick solution**: Build a translation service from scratch is not easy and quick. If you don't want to invest in building one, the cloud APIs can save you a huge amount of time.

## Cloud service API keys
To get Google translator api key, visit [here](https://cloud.google.com/translate/docs/getting-started)
To get Microsoft azure translator api key, visit [here](https://www.microsoft.com/en-us/translator/getstarted.aspx)
