import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  inCollection,
  withNativeProps,
  mergeProps,
} from 'taro-fast-common/es/utils/tools';

import './index.less';

const classPrefix = `tfc-divider`;

const contentPositionCollection = ['left', 'right', 'center'];

const defaultProps = {
  contentPosition: 'center',
};

export const Divider = (p) => {
  const props = mergeProps(defaultProps, p);

  const { contentPosition: contentPositionSource } = props;

  const contentPosition = inCollection(
    contentPositionCollection,
    contentPositionSource,
  )
    ? contentPositionSource
    : 'center';

  return withNativeProps(
    props,
    <View
      className={classNames(classPrefix, `${classPrefix}-${contentPosition}`)}
    >
      {props.children && (
        <View className={`${classPrefix}-content`}>{props.children}</View>
      )}
    </View>,
  );
};

Divider.defaultProps = {
  ...defaultProps,
};
