import { View } from '@tarojs/components';

import { withNativeProps } from '../../utils/tools';

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
