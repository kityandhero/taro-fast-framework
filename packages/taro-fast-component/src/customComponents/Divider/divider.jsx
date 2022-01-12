import classNames from 'classnames';
import { View } from '@tarojs/components';

import { inCollection } from 'taro-fast-common/es/utils/tools';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

const classPrefix = `tfc-divider`;

const contentPositionCollection = ['left', 'right', 'center'];

const defaultProps = {
  contentPosition: 'center',
  style: {},
};

class Divider extends ComponentBase {
  render() {
    const {
      style,
      contentPosition: contentPositionSource,
      children,
    } = this.props;

    const contentPosition = inCollection(
      contentPositionCollection,
      contentPositionSource,
    )
      ? contentPositionSource
      : 'center';

    return (
      <View
        className={classNames(classPrefix, `${classPrefix}-${contentPosition}`)}
        style={style}
      >
        {children && (
          <View className={`${classPrefix}-content`}>{children}</View>
        )}
      </View>
    );
  }
}

Divider.defaultProps = {
  ...defaultProps,
};

export default Divider;
