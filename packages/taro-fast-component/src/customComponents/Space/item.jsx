import { View } from '@tarojs/components';
import React from 'react';

import { SpaceContext, getDirection } from './tools';

export default function Item({
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
          {split}
        </View>
      )}
    </>
  );
}
