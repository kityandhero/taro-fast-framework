import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { isFunction } from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';

if (process.env.TARO_ENV !== 'h5') {
  require('@tarojs/taro/html.css');

  Taro.options.html.transformElement = (el) => {
    if (el.nodeName === 'image') {
      el.setAttribute('mode', 'widthFix');
    }
    return el;
  };
}

const defaultProps = {
  html: '',
  onClick: null,
};

class HtmlBox extends BaseComponent {
  triggerClick = (e) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(e);
    }
  };

  renderFurther() {
    const { html } = this.props;

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
