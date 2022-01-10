import React from 'react';
import classNames from 'classnames';
import { View } from '@tarojs/components';

import { mergeProps, withNativeProps } from 'taro-fast-common/es/utils/tools';

import './index.less';

const classPrefix = `tfc-space`;

const defaultProps = {
  direction: 'horizontal',
  fillWidth: false,
  onClick: null,
};

export const Space = (p) => {
  const props = mergeProps(defaultProps, p);

  const { direction, fillWidth, onClick } = props;

  return withNativeProps(
    props,
    <View
      className={classNames(classPrefix, {
        [`${classPrefix}-wrap`]: props.wrap,
        [`${classPrefix}-block`]: props.block,
        [`${classPrefix}-${direction}`]: true,
        [`${classPrefix}-align-${props.align}`]: !!props.align,
        [`${classPrefix}-justify-${props.justify}`]: !!props.justify,
      })}
      style={!!fillWidth ? { width: '100%' } : {}}
      onClick={onClick}
    >
      {React.Children.map(props.children, (child) => {
        return (
          child !== null &&
          child !== undefined && (
            <View className={`${classPrefix}-item`}>{child}</View>
          )
        );
      })}
    </View>,
  );
};

Space.defaultProps = {
  ...defaultProps,
};
