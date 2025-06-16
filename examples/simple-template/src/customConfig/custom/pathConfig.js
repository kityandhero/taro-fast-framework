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

const suggestionPathCollection = {
  home: {
    path: '/suggestion/pages/home/main/index',
  },
  customer: {
    path: '/suggestion/pages/customer/main/index',
  },
  editInformation: {
    path: '/suggestion/pages/editInformation/main/index',
  },
  illustrate: {
    path: '/suggestion/pages/illustrate/main/index',
  },
  resetPassword: {
    path: '/suggestion/pages/resetPassword/main/index',
  },
  setAvatar: {
    path: '/suggestion/pages/setAvatar/main/index',
  },
  signIn: {
    path: '/suggestion/pages/signIn/main/index',
  },
  signInWithWeChat: {
    path: '/suggestion/pages/signInWithWeChat/main/index',
  },
  detailComplaint: {
    path: '/suggestion/pages/detailComplaint/main/index',
  },
  detailFeedback: {
    path: '/suggestion/pages/detailFeedback/main/index',
  },
  detailReport: {
    path: '/suggestion/pages/detailReport/main/index',
  },
  pageListComplaint: {
    path: '/suggestion/pages/pageListComplaint/main/index',
  },
  pageListFeedback: {
    path: '/suggestion/pages/pageListFeedback/main/index',
  },
  pageListReport: {
    path: '/suggestion/pages/pageListReport/main/index',
  },
  submitComplaint: {
    path: '/suggestion/pages/submitComplaint/main/index',
  },
  submitFeedback: {
    path: '/suggestion/pages/submitFeedback/main/index',
  },
  submitReport: {
    path: '/suggestion/pages/submitReport/main/index',
  },
  verifyPhone: {
    path: '/suggestion/pages/verifyPhone/main/index',
  },
  verifyPhoneWithWeChat: {
    path: '/suggestion/pages/verifyPhoneWithWeChat/main/index',
  },
};

export const pathCustomCollection = {
  communication: communicationPathCollection,
  user: userPathCollection,
  information: informationPathCollection,
  root: rootPathCollection,
  webpage: webPagePathCollection,
  suggestion: suggestionPathCollection,
};
