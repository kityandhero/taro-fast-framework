import {
  rootPathGeneralCollection,
  webPagePathGeneralCollection,
} from '../general';

const rootPathCollection = {
  ...rootPathGeneralCollection,
  maintainer: {
    path: '/pages/maintainer/main/index',
  },
  home: {
    path: '/pages/home/main/index',
  },
};

const webPagePathCollection = {
  ...webPagePathGeneralCollection,
};

export const maintainerPathCollection = {
  changePassword: {
    path: '/maintainer/pages/changePassword/main/index',
  },
  editInformation: {
    path: '/maintainer/pages/editInformation/main/index',
  },
  resetPassword: {
    path: '/maintainer/pages/resetPassword/main/index',
  },
  security: {
    path: '/maintainer/pages/security/main/index',
  },
  setAddress: {
    path: '/maintainer/pages/setAddress/main/index',
  },
  setAvatar: {
    path: '/maintainer/pages/setAvatar/main/index',
  },
  setBirthday: {
    path: '/maintainer/pages/setBirthday/main/index',
  },
  signIn: {
    path: '/maintainer/pages/signIn/main/index',
  },
  signInWithWeChat: {
    path: '/maintainer/pages/signInWithWeChat/main/index',
  },
  pageListApplicationUserFeedback: {
    path: '/maintainer/pages/pageListApplicationUserFeedback/main/index',
  },
  detailApplicationUserFeedback: {
    path: '/maintainer/pages/detailApplicationUserFeedback/main/index',
  },
  submitApplicationUserFeedback: {
    path: '/maintainer/pages/submitApplicationUserFeedback/main/index',
  },
};

export const pathCustomCollection = {
  maintainer: maintainerPathCollection,
  root: rootPathCollection,
  webpage: webPagePathCollection,
};
