import { checkWhetherDevelopmentEnvironment } from 'easy-soft-utility';

import { filePrefix } from './customConfig';

const LogoImage = `${filePrefix}746868813.jpeg`;

export const config = {
  appId: 'pddwo4uuzpdekg',
  showLogInConsole: checkWhetherDevelopmentEnvironment(),
  // showLogInConsole: true,
  // showRequestInfo: checkWhetherDevelopmentEnvironment(),
  // showUseVirtualRequestMessage: true,
  apiPrefix: {
    corsTargetDomain: 'https://app.api.oa.32306.net',
  },
  apiSuccessCode: 200,
  authenticationFailCode: 2001,
  navigationToSignInWhenSignInSilentFail: true,
  signInPath: '/customer/pages/signIn/main/index',
  apiVersion: 'beta',
  footerImage: LogoImage,
  footerText: '',
  footerDescription: '',
  defaultMetaData: {
    rankList: [],
    sectionList: [],
  },
};
