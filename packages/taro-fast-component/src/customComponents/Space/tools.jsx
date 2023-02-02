import React from 'react';

import { checkInCollection } from 'easy-soft-utility';

export const SpaceContext = React.createContext({
  latestIndex: 0,
  horizontalSize: 0,
  verticalSize: 0,
  supportFlexGap: false,
});

const directionCollection = ['horizontal', 'vertical'];

export const getDirection = (direction) => {
  return checkInCollection(directionCollection, direction)
    ? direction
    : 'horizontal';
};
