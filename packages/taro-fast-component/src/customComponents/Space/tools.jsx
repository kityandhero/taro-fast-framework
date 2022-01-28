import React from 'react';

import { inCollection } from 'taro-fast-common/es/utils/tools';

export const SpaceContext = React.createContext({
  latestIndex: 0,
  horizontalSize: 0,
  verticalSize: 0,
  supportFlexGap: false,
});

const directionCollection = ['horizontal', 'vertical'];

export const getDirection = (direction) => {
  return inCollection(directionCollection, direction)
    ? direction
    : 'horizontal';
};
