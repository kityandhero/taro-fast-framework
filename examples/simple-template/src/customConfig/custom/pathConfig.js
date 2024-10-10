import {
  customerPathGeneralCollection,
  informationPathGeneralCollection,
  rootPathGeneralCollection,
  webPagePathGeneralCollection,
} from '../general';

const rootPathCollection = {
  ...rootPathGeneralCollection,
  customer: {
    path: '/pages/customer/main/index',
  },
  flowCase: {
    path: '/pages/flowCase/main/index',
  },
  home: {
    path: '/pages/home/main/index',
  },
};

const webPagePathCollection = {
  ...webPagePathGeneralCollection,
};

const informationPathCollection = {
  ...informationPathGeneralCollection,
  pageListNotice: {
    path: '/information/pages/pageListNotice/main/index',
  },
  noticeDetail: {
    path: '/information/pages/noticeDetail/main/index',
  },
};

const customerPathCollection = {
  ...customerPathGeneralCollection,
  pageListCreateApprove: {
    path: '/customer/pages/pageListCreateApprove/main/index',
  },
  pageListLatestApprove: {
    path: '/customer/pages/pageListLatestApprove/main/index',
  },
  pageListWaitApprove: {
    path: '/customer/pages/pageListWaitApprove/main/index',
  },
  approve: {
    path: '/customer/pages/approve/main/index',
  },
};

export const pathCustomCollection = {
  root: rootPathCollection,
  webpage: webPagePathCollection,
  customer: customerPathCollection,
  information: informationPathCollection,
};
