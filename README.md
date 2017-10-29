## Power Translator - A simple way to use cloud translation services
PowerTranslator gives you a no-hassle way to use Google and Microsoft cloud translation services in react native. It can be used as a component or as a service.

![Power Translator Demo](https://github.com/danielkalbasi/react-native-power-translator/blob/master/power-translator-demo.gif)

Get the demo file from here: [Download Demo](https://gist.github.com/danielkalbasi/350d960a6d28016a3331f6a9c7baefa4)
## Install
```
npm i react-native-power-translator --save
```
## Get started
1. Import a few things.
```
import { PowerTranslator, ProviderTypes, Translation } from 'react-native-power-translator';
```
* **PowerTranslator**: is a simple component to translate your texts.
* **ProviderTypes**: is a type of cloud provider you want to use. There are two providers you can specify. ProvierTypes.Google for [google translate](https://cloud.google.com/translate/docs/) and ProviderTypes.Microsoft for [microsoft translator text](https://azure.microsoft.com/en-us/services/cognitive-services/translator-text-api/) cloud service.
* **Translation**: is a service which you can directly translate your texts. It returns a promise.

2. Set PowerTranslator configuration. The translation service is designed singleton, so you can call it anywhere and anytime, as long as it gets called, we are good!
```
//Example
Translation.setConfig('Provider_Type', 'Your_API_Key','Target_Language', 'Source_Language');

//Fill with your own details
Translation.setConfig(ProviderTypes.Google, 'xxxx','fr');
```
Note: The source of the language is optional, if you are not passing it, the provider will detect the language for you.
## Use it as a component
```
<PowerTranslator text={'Engineering physics or engineering science refers to the study of the combined disciplines of physics'} />
```
## Use it as a service
You can also use it as a service. The return value will be a promise with a translated text.
```
Translation.get('Engineering physics or engineering science').then(translated => {
    //Do something with the translated text
});
```
## Props list
Here is the list of props: 
* **text**: The text you need to translate. Required.
* **onTranslationStart**: Get triggered when the text translation gets started.
* **onTranslationEnd**: Get triggered when the text translation ends.
* **style**: Styles for translated text. All the react native Text styles props are valid.
## Inspiration on how to use it
A few use cases that you can use with this module.
* **As a fallback translation**: If you have your own translation service and you don't need to translate everything by cloud translation, you can have this next to yours as a fallback. In case your primary translation failed for some reason or you didn't translate the words yet,your users can at least see a translated text and use your content.
* **As a quick solution**: Setup of a translation service from scratch is not easy and quick. All these cloud APIs can save you a huge amount of time if you don't want to invest much on translaion.
## To get API keys
To get Google translator api key, visit [here](https://cloud.google.com/translate/docs/getting-started)
To get Microsoft azure translator api key, visit [here](https://www.microsoft.com/en-us/translator/getstarted.aspx)
## How to help?
The contribution document is still in progress. It will be ready soon.