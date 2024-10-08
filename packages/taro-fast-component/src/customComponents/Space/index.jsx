import classNames from 'classnames';
import React from 'react';
import { View } from '@tarojs/components';

import { checkInCollection, isArray, isUndefined } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';

import { SpaceItem } from './spaceItem';
import { getDirection, SpaceContext } from './tools';

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
  return checkInCollection(alignCollection, align) ? align : 'center';
};

const Space = (properties) => {
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
    ...otherProperties
  } = properties;

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

  const nodes = isUndefined(properties.children)
    ? []
    : React.Children.map(properties.children, (child, index) => {
        if (child !== null && child !== undefined) {
          latestIndex = index;
        }

        return (
          <SpaceItem
            className={itemClassName}
            key={`${itemClassName}-${index}`}
            direction={direction}
            index={index}
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
      {...otherProperties}
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

export { Space };
