import React from 'react';
import { View } from '@tarojs/components';
import classNames from 'classnames';

import {
  withNativeProps,
  mergeProps,
  inCollection,
} from 'taro-fast-common/es/utils/tools';

const classPrefix = `tfc-steps`;
const stepClassPrefix = `tfc-step`;

const defaultIcon = <View className={`${stepClassPrefix}-icon-dot`} />;

const directionCollection = ['horizontal', 'vertical'];

const defaultProps = {
  current: 0,
  direction: 'horizontal',
};

export const Steps = (p) => {
  const props = mergeProps(defaultProps, p);
  const { direction: directionSource, current } = props;

  const direction = inCollection(directionCollection, directionSource)
    ? directionSource
    : 'horizontal';

  const classString = classNames(classPrefix, `${classPrefix}-${direction}`);

  return withNativeProps(
    props,
    <View className={classString}>
      {React.Children.map(props.children, (child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }
        const childProps = child.props;
        let status = childProps.status || 'wait';

        if (index < current) {
          status = childProps.status || 'finish';
        } else if (index === current) {
          status = childProps.status || 'process';
        }

        const icon = childProps.icon ?? defaultIcon;

        return React.cloneElement(child, {
          status,
          icon,
        });
      })}
    </View>,
  );
};

Steps.defaultProps = {
  ...defaultProps,
};
