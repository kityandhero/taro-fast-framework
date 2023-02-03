import Prism from 'prismjs';
import Taro from '@tarojs/taro';

import { AbstractComponent, copyToClipboard } from 'taro-fast-common';
import { HtmlBox } from 'taro-fast-component';

import './index.less';

if (process.env.TARO_ENV !== 'h5') {
  require('@tarojs/taro/html.css');
}

Taro.options.html.transformElement = (el) => {
  if (el.nodeName === 'text') {
    el.setAttribute('decode', 'true');
  }
  return el;
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
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    this.highlight();
  };

  highlight = () => {
    const { code, language } = this.props;

    return Prism.highlight(code, Prism.languages[language], language);
  };

  buildHtml = () => {
    const { plugins, language } = this.props;

    return `<pre class="${
      !plugins ? '' : plugins.join(' ')
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
    return <HtmlBox html={this.buildHtml()} onClick={this.triggerClick} />;
  }
}

PrismCode.defaultProps = {
  ...AbstractComponent.defaultProps,
  ...defaultProps,
};

export { PrismCode };
