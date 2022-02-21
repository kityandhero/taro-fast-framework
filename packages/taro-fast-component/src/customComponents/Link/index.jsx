import classNames from 'classnames';
import { Text } from '@tarojs/components';

import {
  showWarnMessage,
  stringIsNullOrWhiteSpace,
  transformSize,
  isBrowser,
  isWechat,
  copyToClipboard,
  showSuccessMessage,
} from 'taro-fast-common/es/utils/tools';
import {
  isArray,
  isNumber,
  isString,
} from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

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

class Line extends BaseComponent {
  getColor = () => {
    const { color } = this.props;

    if (isString(color)) {
      if (stringIsNullOrWhiteSpace(color)) {
        return {};
      }

      return {
        '--background-color': color,
        '--background-image': 'null',
      };
    }

    if (isArray(color)) {
      const a = color.filter(
        (o) => isString(o) && !stringIsNullOrWhiteSpace(o),
      );

      if (a.length > 0) {
        return {
          '--background-color': 'null',
          '--background-image': `linear-gradient(45deg, ${a.join()})`,
        };
      }
    }

    return {};
  };

  getStyle = () => {
    const { color, underLine, fontSize } = this.props;

    return {
      ...(stringIsNullOrWhiteSpace(color)
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

    if (stringIsNullOrWhiteSpace(href)) {
      const text = '未配置跳转链接';

      showWarnMessage({
        message: text,
      });

      return;
    }

    if (isWechat) {
      copyToClipboard({
        text: href,
        successCallback: stringIsNullOrWhiteSpace(copyTips)
          ? null
          : () => {
              showSuccessMessage({
                message: copyTips,
              });
            },
      });

      return;
    }

    if (isBrowser) {
      window.open(href);

      return;
    } else {
      const text = '暂未适配';

      showWarnMessage({
        message: text,
      });
    }
  };

  renderFurther() {
    const { text } = this.props;

    const style = this.getStyle();

    return (
      <Text
        className={classNames(classPrefix)}
        style={style}
        onClick={this.triggerClick}
      >
        {text}
      </Text>
    );
  }
}

Line.defaultProps = {
  ...defaultProps,
};

export default Line;
