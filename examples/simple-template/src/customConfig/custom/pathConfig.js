import {
  customerPathGeneralCollection,
  rootPathGeneralCollection,
  webPagePathGeneralCollection,
} from '../general';

const rootPathCollection = {
  ...rootPathGeneralCollection,
};

const webPagePathCollection = {
  ...webPagePathGeneralCollection,
};

const customerPathCollection = {
  ...customerPathGeneralCollection,
};

export const pathCustomCollection = {
  root: rootPathCollection,
  webpage: webPagePathCollection,
  customer: customerPathCollection,
};
