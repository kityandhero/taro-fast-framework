import React from 'react';
import classNames from 'classnames';
import { View } from '@tarojs/components';

import { mergeProps } from 'taro-fast-common/es/utils/tools';

import { withNativeProps } from '../../utils/tools';

import './index.less';

const classPrefix = `tfc-space`;

const defaultProps = {
  direction: 'horizontal',
};

export const Space = (p) => {
  const props = mergeProps(defaultProps, p);
  const { direction, onClick } = props;
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
