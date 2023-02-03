import React from 'react';
import { View } from '@tarojs/components';

import { VerticalBox } from '../VerticalBox';

import { getDirection, SpaceContext } from './tools';

export function SpaceItem({
  className = '',
  direction: directionSource = 'horizontal',
  index = 0,
  children,
  split = null,
}) {
  const { latestIndex } = React.useContext(SpaceContext);

  const direction = getDirection(directionSource);

  let style = {};

  if (children === null || children === undefined) {
    return null;
  }

  return (
    <>
      <View
        className={className}
        style={{
          style,
          ...(direction === 'vertical' ? { width: '100%' } : {}),
        }}
      >
        {children}
      </View>

      {index < latestIndex && split && (
        <View
          className={`${className}-split`}
          style={{
            style,
            ...(direction === 'vertical' ? { width: '100%' } : {}),
          }}
        >
          {direction === 'horizontal' ? (
            <VerticalBox>{split}</VerticalBox>
          ) : (
            split
          )}
        </View>
      )}
    </>
  );
}
