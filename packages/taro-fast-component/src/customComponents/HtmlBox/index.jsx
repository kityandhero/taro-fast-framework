import { RichText, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { isFunction } from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';

if (process.env.TARO_ENV !== 'h5') {
  // eslint-disable-next-line unicorn/prefer-module
  require('@tarojs/taro/html.css');

  Taro.options.html.transformElement = (element) => {
    if (element.nodeName === 'image') {
      element.setAttribute('mode', 'widthFix');
    }
    return element;
  };
}

const defaultProps = {
  richText: true,
  html: '',
  onClick: null,
};

class HtmlBox extends BaseComponent {
  triggerClick = (event) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(event);
    }
  };

  renderFurther() {
    const { richText, html } = this.props;

    if (richText) {
      return <RichText nodes={html} onTap={this.triggerClick} />;
    }

    return (
      <View
        className="taro_html"
        dangerouslySetInnerHTML={{ __html: html }}
        onClick={this.triggerClick}
      />
    );
  }
}

HtmlBox.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { HtmlBox };
