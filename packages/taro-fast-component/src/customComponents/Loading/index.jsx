import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  buildStringStyle,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';

import './index.less';

const classPrefix = `tfc-loading`;

const typeCollection = ['ring', 'comet'];

const defaultProps = {
  size: 0,
  borderWidth: 0,
  color: '',
  type: 'ring',
};

class Loading extends BaseComponent {
  getType = () => {
    const { type } = this.props;

    return checkInCollection(typeCollection, type) ? type : 'ring';
  };

  getStyle = () => {
    const { color, size, borderWidth } = this.props;

    const type = this.getType();

    let sizeStyle = {};
    let colorStyle = {};
    let borderWidthStyle = {};

    if (size > 0) {
      sizeStyle = {
        '--width': transformSize(size),
        '--height': transformSize(size),
      };
    }

    if (!checkStringIsNullOrWhiteSpace(color)) {
      colorStyle = {
        '--color': color,
      };
    }

    if (borderWidth > 0) {
      switch (type) {
        case 'ring':
          borderWidthStyle = {
            '--ring-border-width': transformSize(borderWidth),
          };
          break;

        case 'comet':
          borderWidthStyle = {
            '--comet-border-width': transformSize(borderWidth),
          };
          break;

        default:
          break;
      }
    }

    return { ...sizeStyle, ...colorStyle, ...borderWidthStyle };
  };

  renderFurther() {
    const type = this.getType();
    const style = this.getStyle();

    console.log(buildStringStyle(style));

    return (
      <View className={classNames(classPrefix)} style={buildStringStyle(style)}>
        {type === 'ring' ? (
          <>
            <View className={classNames(`${classPrefix}__ring`)} />
            <View className={classNames(`${classPrefix}__ring`)} />
            <View className={classNames(`${classPrefix}__ring`)} />
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

export { Loading };
