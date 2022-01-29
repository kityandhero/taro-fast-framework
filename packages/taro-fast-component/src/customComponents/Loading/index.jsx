import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  inCollection,
  stringIsNullOrWhiteSpace,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import './index.less';

const classPrefix = `tfc-loading`;

const typeCollection = ['ring', 'comet'];

const defaultProps = {
  size: 0,
  borderWidth: 0,
  color: '',
  type: 'ring',
};

class Loading extends ComponentBase {
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

    if (size > 0) {
      sizeStyle = {
        '--width': transformSize(size),
        '--height': transformSize(size),
      };
    }

    if (!stringIsNullOrWhiteSpace(color)) {
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
  ...defaultProps,
};

export default Loading;
