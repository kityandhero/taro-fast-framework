import { View } from '@tarojs/components';

import { mergeProps, withNativeProps } from 'taro-fast-common/es/utils/tools';

import './index.less';

const classPrefix = 'tfc-auto-center';

const defaultProps = {
  style: {},
};

export const AutoCenter = (p) => {
  const props = mergeProps(defaultProps, p);

  const { style } = props;

  return withNativeProps(
    props,
    <View className={classPrefix} style={style}>
      <View className={`${classPrefix}-content`}>{props.children}</View>
    </View>,
  );
};

AutoCenter.defaultProps = {
  ...defaultProps,
};
