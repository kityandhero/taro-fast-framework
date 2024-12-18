import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isNumber,
  isString,
  showInfoMessage,
  showWarnMessage,
} from 'easy-soft-utility';

import {
  checkWeAppEnvironment,
  checkWebEnvironment,
  copyToClipboard,
  transformSize,
} from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';

import './index.less';

const classPrefix = `tfc-link`;

const defaultProps = {
  text: '',
  href: '',
  copyTips: '',
  underLine: false,
  fontSize: 28,
  color: '',
};

class Link extends BaseComponent {
  getColor = () => {
    const { color } = this.props;

    if (isString(color)) {
      if (checkStringIsNullOrWhiteSpace(color)) {
        return {};
      }

      return {
        '--background-color': color,
        '--background-image': 'null',
      };
    }

    if (isArray(color)) {
      const a = color.filter(
        (o) => isString(o) && !checkStringIsNullOrWhiteSpace(o),
      );

      if (a.length > 0) {
        return {
          '--background-color': 'null',
          '--background-image': `linear-gradient(45deg, ${a.join(',')})`,
        };
      }
    }

    return {};
  };

  getStyle = () => {
    const { color, underLine, fontSize } = this.props;

    return {
      ...(checkStringIsNullOrWhiteSpace(color)
        ? {}
        : {
            '--color': color,
          }),
      ...(isNumber(fontSize)
        ? {
            '--font-size': transformSize(fontSize),
            '--line-height': transformSize(fontSize + 4),
          }
        : {}),
      ...(underLine ? { '--text-decoration': 'underline' } : {}),
    };
  };

  triggerClick = () => {
    const { href, copyTips } = this.props;

    if (checkStringIsNullOrWhiteSpace(href)) {
      const text = '未配置跳转链接';

      showWarnMessage({
        text: text,
      });

      return;
    }

    if (checkWeAppEnvironment()) {
      copyToClipboard({
        text: href,
        successCallback: checkStringIsNullOrWhiteSpace(copyTips)
          ? null
          : () => {
              showInfoMessage({
                text: copyTips,
              });
            },
      });

      return;
    }

    if (checkWebEnvironment()) {
      window.open(href);

      return;
    } else {
      const text = '暂未适配';

      showWarnMessage({
        text: text,
      });
    }
  };

  renderFurther() {
    const { text } = this.props;

    const style = this.getStyle();

    return (
      <View
        className={classNames(classPrefix)}
        style={style}
        userSelect
        onClick={this.triggerClick}
      >
        {text}
      </View>
    );
  }
}

Link.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { Link };
