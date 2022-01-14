import { View, Text, Image } from '@tarojs/components';

import { mergeProps, withNativeProps } from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import RightArrowIcon from '../../assets/rightArrow.svg';

const defaultProps = {
  text: '更多',
  icon: (
    <Image style={{ width: '26rpx', height: '26rpx' }} src={RightArrowIcon} />
  ),
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
