import {
  rootPathGeneralCollection,
  userPathGeneralCollection,
  webPagePathGeneralCollection,
} from '../general';

const rootPathCollection = {
  ...rootPathGeneralCollection,
  user: {
    path: '/pages/user/main/index',
  },
  home: {
    path: '/pages/home/main/index',
  },
};

const webPagePathCollection = {
  ...webPagePathGeneralCollection,
};

const userPathCollection = {
  ...userPathGeneralCollection,
};

export const pathCustomCollection = {
  user: userPathCollection,
  root: rootPathCollection,
  webpage: webPagePathCollection,
};
