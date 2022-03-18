import { View } from '@tarojs/components';

import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

if (process.env.TARO_ENV !== 'h5') {
  require('@tarojs/taro/html.css');
}

const defaultProps = {
  html: '',
  canCopy: false,
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
  ...defaultProps,
};

export default HtmlBox;
