import { View } from '@tarojs/components';

import { mergeProps } from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';

import './index.less';

const defaultProps = {
  show: true,
};

const FadeView = (p) => {
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
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { FadeView };
