import React from 'react';
import classNames from 'classnames';
import { View } from '@tarojs/components';

import { inCollection, transformSize } from 'taro-fast-common/es/utils/tools';
import { isArray, isUndefined } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

import { SpaceContext, getDirection } from './tools';
import SpaceItem from './spaceItem';

import './index.less';

const classPrefix = `tfc-space`;

const alignCollection = ['start', 'end', 'center', 'baseline'];

const defaultProps = {
  className: '',
  style: {},
  size: 16,
  direction: 'horizontal',
  align: 'center',
  split: null,
  wrap: false,
  fillWidth: false,
};

const getAlign = (align) => {
  return inCollection(alignCollection, align) ? align : 'center';
};

export const Space = (props) => {
  const {
    size,
    align: alignSource,
    className,
    children,
    direction: directionSource,
    classPrefix: customizePrefixCls,
    split,
    style,
    wrap = false,
    fillWidth = false,
    ...otherProps
  } = props;

  const direction = getDirection(directionSource);
  const align = getAlign(alignSource);

  const [horizontalSize, verticalSize] = React.useMemo(
    () => (isArray(size) ? size : [size, size]).map((item) => item),
    [size],
  );

  const mergedAlign =
    align === undefined && direction === 'horizontal' ? 'center' : align;
  const cn = classNames(
    classPrefix,
    `${classPrefix}-${direction}`,
    {
      [`${classPrefix}-align-${mergedAlign}`]: mergedAlign,
    },
    className,
  );

  const itemClassName = `${classPrefix}-item`;

  const marginDirection = 'marginRight';

  let latestIndex = 0;

  const nodes = isUndefined(props.children)
    ? []
    : React.Children.map(props.children, (child, i) => {
        if (child !== null && child !== undefined) {
          latestIndex = i;
        }

        return (
          <SpaceItem
            className={itemClassName}
            key={`${itemClassName}-${i}`}
            direction={direction}
            index={i}
            marginDirection={marginDirection}
            split={split}
            wrap={wrap}
          >
            {child}
          </SpaceItem>
        );
      });

  const spaceContext = React.useMemo(
    () => ({ horizontalSize, verticalSize, latestIndex }),
    [horizontalSize, verticalSize, latestIndex],
  );

  if (nodes.length === 0) {
    return null;
  }

  const gapStyle = {};

  if (wrap) {
    gapStyle.flexWrap = 'wrap';
  }

  gapStyle['--column-gap'] = transformSize(horizontalSize);
  gapStyle['--row-gap'] = transformSize(verticalSize);

  return (
    <View
      className={cn}
      style={{
        ...gapStyle,
        ...style,
        ...(fillWidth ? { width: '100%' } : {}),
      }}
      {...otherProps}
    >
      <SpaceContext.Provider value={spaceContext}>
        {nodes}
      </SpaceContext.Provider>
    </View>
  );
};

Space.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};
