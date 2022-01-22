import classNames from 'classnames';
import { View } from '@tarojs/components';

import { mergeProps, withNativeProps } from 'taro-fast-common/es/utils/tools';

import './index.less';

const classPrefix = `tfc-badge`;

const defaultProps = {
  color: '#FF411C',
  content: null,
};

export const dot = Symbol();

export const Badge = (p) => {
  const props = mergeProps(defaultProps, p);
  const { content, color, children } = props;

  const isDot = content === Badge.dot;

  const badgeCls = classNames(classPrefix, {
    [`${classPrefix}-fixed`]: !!children,
    [`${classPrefix}-dot`]: isDot,
  });

  const element = content
    ? withNativeProps(
        props,
        <View
          className={badgeCls}
          style={{
            backgroundColor: color,
          }}
        >
          {!isDot && content}
        </View>,
      )
    : null;

  return children ? (
    <View className={`${classPrefix}-wrap`}>
      {children}
      {element}
    </View>
  ) : (
    element
  );
};

Badge.dot = Symbol();

Badge.defaultProps = {
  ...defaultProps,
};
