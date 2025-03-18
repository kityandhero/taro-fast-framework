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

const customerPathCollection = {
  ...customerPathGeneralCollection,
  approve: {
    path: '/customer/pages/approve/main/index',
  },
  detailFlowCase: {
    path: '/customer/pages/detailFlowCase/main/index',
  },
  flowCaseForm: {
    path: '/customer/pages/flowCaseForm/main/index',
  },
  pageListCreateApprove: {
    path: '/customer/pages/pageListCreateApprove/main/index',
  },
  pageListLatestApprove: {
    path: '/customer/pages/pageListLatestApprove/main/index',
  },
  pageListWaitApprove: {
    path: '/customer/pages/pageListWaitApprove/main/index',
  },
  pageListWorkflow: {
    path: '/customer/pages/pageListWorkflow/main/index',
  },
  setting: {
    path: '/customer/pages/setting/main/index',
  },
};

export const pathCustomCollection = {
  communication: communicationPathCollection,
  customer: customerPathCollection,
  information: informationPathCollection,
  root: rootPathCollection,
  webpage: webPagePathCollection,
};
