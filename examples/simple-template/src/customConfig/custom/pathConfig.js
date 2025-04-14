import {
  informationPathGeneralCollection,
  rootPathGeneralCollection,
  userPathGeneralCollection,
  webPagePathGeneralCollection,
} from '../general';

const rootPathCollection = {
  ...rootPathGeneralCollection,
  user: {
    path: '/pages/user/main/index',
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
  noticeDetail: {
    path: '/information/pages/noticeDetail/main/index',
  },
  pageListNotice: {
    path: '/information/pages/pageListNotice/main/index',
  },
};

const communicationPathCollection = {
  ...informationPathGeneralCollection,
  singleListAddressBook: {
    path: '/communication/pages/singleListAddressBook/main/index',
  },
};

const userPathCollection = {
  ...userPathGeneralCollection,
  approve: {
    path: '/user/pages/approve/main/index',
  },
  detailFlowCase: {
    path: '/user/pages/detailFlowCase/main/index',
  },
  flowCaseForm: {
    path: '/user/pages/flowCaseForm/main/index',
  },
  pageListCreateApprove: {
    path: '/user/pages/pageListCreateApprove/main/index',
  },
  pageListLatestApprove: {
    path: '/user/pages/pageListLatestApprove/main/index',
  },
  pageListWaitApprove: {
    path: '/user/pages/pageListWaitApprove/main/index',
  },
  pageListWorkflow: {
    path: '/user/pages/pageListWorkflow/main/index',
  },
  setting: {
    path: '/user/pages/setting/main/index',
  },
};

export const pathCustomCollection = {
  communication: communicationPathCollection,
  user: userPathCollection,
  information: informationPathCollection,
  root: rootPathCollection,
  webpage: webPagePathCollection,
};
