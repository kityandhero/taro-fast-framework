import { View } from '@tarojs/components';

import { mergeProps } from 'taro-fast-common/es/utils/tools';

import './index.less';

const defaultProps = {
  show: true,
};

export const FadeView = (p) => {
  const props = mergeProps(defaultProps, p);

  const { show: showValue } = props;

  const show = showValue || false;

  // eslint-disable-next-line no-unused-vars
  const handleTouchMove = (e) => {
    // eslint-disable-next-line no-undef
    if (fullscreen) {
      e.stopPropagation();
    }
  };

  return (
    <View
      className={`tfc-fade-view-containor ${
        show ? 'tfc-fade-view-show' : 'tfc-fade-view-hide'
      }`}
      style={{
        width: '100%',
        height: '100%',
        transition: 'opacity 0.2s',
      }}
    >
      {props.children}
    </View>
  );
};

FadeView.defaultProps = {
  ...defaultProps,
};
