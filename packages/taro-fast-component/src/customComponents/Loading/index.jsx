import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  inCollection,
  stringIsNullOrWhiteSpace,
  transformSize,
} from 'taro-fast-common/es/utils/tools';

import BaseComponent from '../BaseComponent';

import './index.less';

const classPrefix = `tfc-loading`;

const typeCollection = ['ring', 'comet'];

const defaultProps = {
  size: 0,
  borderWidth: 1,
  color: '',
  type: 'ring',
};

class Loading extends BaseComponent {
  getType = () => {
    const { type } = this.props;

    return inCollection(typeCollection, type) ? type : 'ring';
  };

  getStyle = () => {
    const { color, size, borderWidth } = this.props;

    const type = this.getType();

    let sizeStyle = {};
    let colorStyle = {};
    let borderWidthStyle = {};

    sizeStyle = {
      '--width': size > 0 ? transformSize(size) : transformSize(36),
      '--height': size > 0 ? transformSize(size) : transformSize(36),
    };

    if (!stringIsNullOrWhiteSpace(color)) {
      colorStyle = {
        '--color': color,
      };
    }

    switch (type) {
      case 'ring':
        borderWidthStyle = {
          '--ring-border-width':
            borderWidth > 0 ? transformSize(borderWidth) : transformSize(1),
        };
        break;

      case 'comet':
        borderWidthStyle = {
          '--comet-border-width':
            borderWidth > 0 ? transformSize(borderWidth) : transformSize(4),
        };
        break;

      default:
        break;
    }

    return {
      ...sizeStyle,
      ...colorStyle,
      ...borderWidthStyle,
      ...{
        width: transformSize(36),
        height: transformSize(36),
      },
    };
  };

  renderFurther() {
    const type = this.getType();
    const style = this.getStyle();

    const ringStyle = {
      width: `calc(var(--width) - ${transformSize(
        2,
      )} - var(--ring-border-width) * 2)`,
      height: `calc(var(--height) - ${transformSize(
        2,
      )} - var(--ring-border-width) * 2)`,
      margin: transformSize(1),
    };

    return (
      <View className={classNames(classPrefix)} style={style}>
        {type === 'ring' ? (
          <>
            <View
              className={classNames(`${classPrefix}__ring`)}
              style={ringStyle}
            />
            <View
              className={classNames(`${classPrefix}__ring`)}
              style={ringStyle}
            />
            <View
              className={classNames(`${classPrefix}__ring`)}
              style={ringStyle}
            />
          </>
        ) : null}

        {type === 'comet' ? (
          <>
            <View className={classNames(`${classPrefix}__comet`)} />
          </>
        ) : null}
      </View>
    );
  }
}

Loading.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Loading;
