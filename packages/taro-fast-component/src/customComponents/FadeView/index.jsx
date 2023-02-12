import { View } from '@tarojs/components';

import { mergeProperties } from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';

import './index.less';

const defaultProps = {
  show: true,
};

const FadeView = (p) => {
  const properties = mergeProperties(defaultProps, p);

  const { show: showValue, children } = properties;

  const show = showValue || false;

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
      {children}
    </View>
  );
};

FadeView.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { FadeView };
