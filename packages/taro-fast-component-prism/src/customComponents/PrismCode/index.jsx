import Prism from 'prismjs';
import { Textarea, View } from '@tarojs/components';
// import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import {
  AbstractComponent,
  copyToClipboard,
  transformSize,
} from 'taro-fast-common';

// import { HtmlBox } from 'taro-fast-component';
import './index.less';

if (process.env.TARO_ENV !== 'h5') {
  // eslint-disable-next-line unicorn/prefer-module
  require('@tarojs/taro/html.css');
}

Taro.options.html.transformElement = (element) => {
  if (element.nodeName === 'text') {
    element.setAttribute('decode', 'true');
  }
  return element;
};

const defaultProps = {
  code: '',
  plugins: [],
  language: 'javascript',
  canCopy: false,
};

class PrismCode extends AbstractComponent {
  doWorkAdjustDidMount = () => {
    this.highlight();
  };

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProperties, preState, snapshot) => {
    this.highlight();
  };

  highlight = () => {
    const { code, language } = this.props;

    return Prism.highlight(code, Prism.languages[language], language);
  };

  buildHtml = () => {
    const { plugins, language } = this.props;

    return `<pre class="${
      plugins ? plugins.join(' ') : ''
    } tfc-prism-code-box"><code class="${`language-${language}`}">${this.highlight()}</code></pre>`;
  };

  triggerClick = () => {
    const { canCopy, code } = this.props;

    if (canCopy) {
      copyToClipboard({
        text: code,
      });
    }
  };

  renderFurther() {
    const { code } = this.props;

    return (
      <View
        style={{
          backgroundColor: '#000',
          borderRadius: transformSize(10),
          paddingTop: transformSize(10),
          paddingLeft: transformSize(10),
          paddingRight: transformSize(10),
          paddingBottom: transformSize(10),
        }}
        onClick={this.triggerClick}
      >
        <Textarea
          style={{
            width: '100%',
            color: '#fff',
            fontSize: transformSize(24),
          }}
          autoHeight
          disabled
          value={code}
          maxlength={-1}
        />
      </View>
    );

    // return <View onClick={this.triggerClick}>{code}</View>;

    // return <RichText nodes={this.buildHtml()} onTap={this.triggerClick} />;
    // return <HtmlBox html={this.buildHtml()} onClick={this.triggerClick} />;
  }
}

PrismCode.defaultProps = {
  ...AbstractComponent.defaultProps,
  ...defaultProps,
};

export { PrismCode };
