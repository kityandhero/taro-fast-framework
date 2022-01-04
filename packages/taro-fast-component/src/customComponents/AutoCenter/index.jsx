import { View } from '@tarojs/components';

import { withNativeProps } from 'taro-fast-common/es/utils/tools';

import './index.less';

const classPrefix = 'tfc-auto-center';

export const AutoCenter = (props) => {
  return withNativeProps(
    props,
    <View className={classPrefix}>
      <View className={`${classPrefix}-content`}>{props.children}</View>
    </View>,
  );
};
