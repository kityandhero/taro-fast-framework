import { Text, View } from '@tarojs/components';

import { mergeProps, withNativeProps } from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

const defaultProps = {
  text: '更多',
  icon: null,
  onClick: null,
};

export const More = (p) => {
  const props = mergeProps(defaultProps, p);
  const { text, icon, onClick } = props;

  return withNativeProps(
    props,
    <View
      className="tfc-notice-bar__more"
      onClick={() => {
        if (isFunction(onClick)) {
          onClick();
        }
      }}
    >
      <Text className="text">{text}</Text>

      {icon ? <View className="tfc-notice-bar__more-icon">{icon}</View> : null}
    </View>,
  );
};

More.defaultProps = {
  ...defaultProps,
};
