import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';

import './index.less';

const classPrefix = `tfc-loading`;

const loadingTypeCollection = {
  ring: 'ring',
  comet: 'comet',
};

const defaultProps = {
  size: 36,
  borderWidth: 1,
  color: '',
  type: loadingTypeCollection.ring,
};

class Loading extends BaseComponent {
  getType = () => {
    const { type } = this.props;

    return checkInCollection(
      [loadingTypeCollection.ring, loadingTypeCollection.comet],
      type,
    )
      ? type
      : loadingTypeCollection.ring;
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
        case 'ring': {
          borderWidthStyle = {
            '--ring-border-width': transformSize(borderWidth),
          };
          break;
        }

        case 'comet': {
          borderWidthStyle = {
            '--comet-border-width': transformSize(borderWidth),
          };
          break;
        }

        default: {
          break;
        }
      }
    }

    return { ...sizeStyle, ...colorStyle, ...borderWidthStyle };
  };

  renderFurther() {
    const type = this.getType();
    const style = this.getStyle();

    return (
      <View className={classNames(classPrefix)} style={style}>
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

export { Loading, loadingTypeCollection };
