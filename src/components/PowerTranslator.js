import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { TranslatorFactory } from '../services';

/**
 * Main component of Power Translator module.
 * Translate the text and return the view.
 * The source and target language can be specified through the Translation service.
 */
export default class PowerTranslator extends Component {
    translatedText;

    static propTypes = {
      /**
         * text is your text that need to translate
         * into target language
         */
      text: PropTypes.string.isRequired,

      /**
         * onTranslationStart is a function callback which trigger
         * when the translation is start
         */
      onTranslationStart: PropTypes.func,

      /**
         * onTranslationDone is a function callback which trigger
         * when the translation is done
         */
      onTranslationEnd: PropTypes.func,

      /**
         * style of the translated text.
         * all the styles for Text component is valid.
         */
      style: PropTypes.object,
    };

    static defaultProps = {
      text: '',
      style: {},
      onTranslationStart: () => {},
      onTranslationEnd: () => {},
    };

    constructor(props) {
      super(props);
      this.state = {
        translatedText: '',
      };
    }

    componentDidMount() {
      this.getTranslation();
    }

    componentWillReceiveProps() {
      this.getTranslation();
    }

    getTranslation() {
      this.props.onTranslationStart();
      const translator = TranslatorFactory.createTranslator();

      translator.translate(this.props.text).then((translated) => {
        this.setState({ translatedText: translated }, () => {
          this.props.onTranslationEnd();
        });
      });
    }

    render() {
      return (
        <View>
          <Text style={[{ ...this.props.style }]}>
            {this.state.translatedText}
          </Text>
        </View>
      );
    }
}
